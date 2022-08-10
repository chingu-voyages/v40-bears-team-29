var session = require('supertest-session');
const app = require("../../app/server/app");
const request = require("supertest");
jest.setTimeout(20000);

const { User } = require("../../app/server/models/index");
const user_mock = require("../mocks/user");

const express = require("express");

describe("users controller", () => {
  beforeEach(async () => {
    this.user = User.build(user_mock);
  });

  test("post /api/sign_up should create a new user", async () => {
    await request(app)
      .post("/api/sign_up")
      .send({name: this.user.name, password: this.user.password})
      .expect(200)
      .expect("Content-type", /json/)
      .then(async (serverRes) => {
        expect(serverRes.body).toEqual(expect.any(Object));

        const users_count = await User.count({where: {name: this.user.name}})
        expect(users_count).toEqual(1)
      })
  });

  test("post /api/sign_up should not create a new user if name is already taken", async () => {
    await User.create({...user_mock, name: "user"})
    this.user.name = "user"

    await request(app)
      .post("/api/sign_up")
      .send({name: this.user.name, password: this.user.password})
      .expect(422)
      .expect("Content-type", /json/)
      .then(async (serverRes) => {
        expect(serverRes.body).toEqual(expect.any(Object));
        expect(serverRes.body).toEqual(
          expect.objectContaining({ error: expect.any(Object) })
        )

        const users_count = await User.count({where: {name: this.user.name}})
        expect(users_count).toEqual(1)
      })
  });


  test("post /api/login should login if password match", async () => {
    const plain_password = this.user.password
    this.user.password = await User.hash_password(this.user.password)
    await this.user.save()

    await request(app)
      .post("/api/login")
      .send({name: this.user.name, password: plain_password})
      .expect(200)
      .expect("Content-type", /json/)
      .then(async (serverRes) => {
        expect(serverRes.body).toEqual(expect.any(Object));
        expect(serverRes.body).toEqual(
          expect.objectContaining({ message: expect.any(String) })
        )
        expect(serverRes.headers).toEqual(expect.objectContaining({"set-cookie": expect.any(Object)}))
      })
  });


  test("post /api/login should not login if password does not match", async () => {
    this.user.password = await User.hash_password(this.user.password)
    await this.user.save()

    await request(app)
      .post("/api/login")
      .send({name: this.user.name, password: "wrong_password"})
      .expect(401)
      .expect("Content-type", /json/)
      .then(async (serverRes) => {
        expect(serverRes.body).toEqual(expect.any(Object));
        expect(serverRes.body).toEqual(
          expect.objectContaining({ error: expect.any(String) })
        )
      })
  });

  test("post /api/login should return an error if not user is found", async () => {
    await request(app)
      .post("/api/login")
      .send({name: this.user.name, password: this.user.password})
      .expect(404)
      .expect("Content-type", /json/)
      .then(async (serverRes) => {
        expect(serverRes.body).toEqual(expect.any(Object));
        expect(serverRes.body).toEqual(
          expect.objectContaining({ error: expect.any(String) })
        )
      })
  });


  test("get /api/logged_user should return the logged user if logged", async () => {
    const plain_password = this.user.password
    this.user.password = await User.hash_password(this.user.password)
    await this.user.save()

    // TODO move this to its own test helper
    var authenticated_session = session(app)
    await authenticated_session.post("/api/login")
      .send({name: this.user.name, password: plain_password})

    await authenticated_session
      .get("/api/logged_user")
      .expect(200)
      .expect("Content-type", /json/)
      .then(async (serverRes) => {
        expect(serverRes.body).toEqual(expect.any(Object));
        expect(serverRes.body).toEqual(
          expect.objectContaining({ user: expect.any(Object) })
        )
      })
  });


  test("get /api/logged_user should not return the logged user if not logged", async () => {
    const plain_password = this.user.password
    this.user.password = await User.hash_password(this.user.password)
    await this.user.save()

    await request(app)
      .get("/api/logged_user")
      .expect(401)
      .expect("Content-type", /json/)
      .then(async (serverRes) => {
        expect(serverRes.body).toEqual(expect.any(Object));
        expect(serverRes.body).toEqual(
          expect.objectContaining({ error: expect.any(String) })
        )
      })
  });
});
