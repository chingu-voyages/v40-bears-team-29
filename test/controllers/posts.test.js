/* eslint-env jest */

const app = require("../../app/server/app");
const request = require("supertest");
jest.setTimeout(1000);

const { User, Post, Upvote } = require("../../app/server/models/index");
const postMock = require("../mocks/post");
const userMock = require("../mocks/user");

const { logUser, loginUser } = require("./controllers_test_helpers");

describe("posts controller", () => {
  beforeEach(async () => {
    this.user = User.build({ ...userMock, username: "original" });
    await this.user.hashPassword();
    this.userPlainPassword = this.user.password;

    this.postUser = User.build({ ...userMock, username: "user9" });
    await this.postUser.hashPassword();
    this.postUserPlainPassword = this.postUser.password;
    await this.postUser.save();

    this.post = await Post.build({ ...postMock, UserId: this.postUser.id });
  });

  jest.retryTimes(10);
  test("post /api/posts should create a new post", async () => {
    const authenticatedSession = await logUser(this.user, app);

    await authenticatedSession
      .post("/api/posts")
      .send({ title: this.post.title, content: this.post.content })
      .expect(200)
      .expect("Content-type", /json/)
      .then(async (serverRes) => {
        expect(serverRes.body).toEqual(expect.any(Object));

        const postsCount = await Post.count({ where: { title: this.post.title } });
        expect(postsCount).toEqual(1);
      });
  });

  jest.retryTimes(10);
  test("post /api/posts should not create a new post if not logged", async () => {
    await request(app)
      .post("/api/posts")
      .send({ title: this.post.title, content: this.post.content })
      .expect(401)
      .expect("Content-type", /json/)
      .then(async (serverRes) => {
        expect(serverRes.body).toEqual(expect.any(Object));

        const postsCount = await Post.count({ where: { title: this.post.title } });
        expect(postsCount).toEqual(0);
      });
  });

  jest.retryTimes(10);
  test("post /api/posts should not create a new post if the post is invalid", async () => {
    const authenticatedSession = await logUser(this.user, app);

    await authenticatedSession
      .post("/api/posts")
      .send({ title: "", content: this.post.content })
      .expect(422)
      .expect("Content-type", /json/)
      .then(async (serverRes) => {
        expect(serverRes.body).toEqual(expect.any(Object));

        const postsCount = await Post.count({ where: { title: this.post.title } });
        expect(postsCount).toEqual(0);
      });
  });

  jest.retryTimes(10);
  test("patch /api/posts should update post if logged", async () => {
    await this.post.save();
    const authenticatedSession = await loginUser(this.postUser, app);

    const newContent = "new contentttt";
    await authenticatedSession
      .patch(`/api/posts/${this.post.id}`)
      .send({ content: newContent })
      .expect(200)
      .expect("Content-type", /json/)
      .then(async (serverRes) => {
        expect(serverRes.body).toEqual(expect.any(Object));

        const postAfter = await Post.findByPk(this.post.id);
        expect(postAfter.content).toEqual(newContent);
      });
  });

  jest.retryTimes(10);
  test("patch /api/posts should not update post if invalid", async () => {
    await this.post.save();
    const authenticatedSession = await loginUser(this.postUser, app);

    const newContent = "";
    await authenticatedSession
      .patch(`/api/posts/${this.post.id}`)
      .send({ content: newContent })
      .expect(422)
      .expect("Content-type", /json/)
      .then(async (serverRes) => {
        expect(serverRes.body).toEqual(expect.any(Object));

        const postAfter = await Post.findByPk(this.post.id);
        expect(postAfter.content).toEqual(this.post.content);
      });
  });

  jest.retryTimes(10);
  test("patch /api/posts should not update post if not logged", async () => {
    await this.post.save();
    const newContent = "new contentttt";

    await request(app)
      .patch(`/api/posts/${this.post.id}`)
      .send({ content: newContent })
      .expect(401)
      .expect("Content-type", /json/)
      .then(async (serverRes) => {
        expect(serverRes.body).toEqual(expect.any(Object));

        const postAfter = await Post.findByPk(this.post.id);
        expect(postAfter.content).toEqual(this.post.content);
      });
  });

  jest.retryTimes(10);
  test("patch /api/posts should not update post if not it doest exists", async () => {
    const authenticatedSession = await loginUser(this.user, app);

    await authenticatedSession
      .patch("/api/posts/99999999")
      .send({ content: "aaaaaaaa" })
      .expect(404)
      .expect("Content-type", /json/)
      .then(async (serverRes) => {
        expect(serverRes.body).toEqual(expect.any(Object));
      });
  });

  jest.retryTimes(10);
  test("delete /api/posts/:id should delete post ", async () => {
    await this.post.save();
    const authenticatedSession = await loginUser(this.postUser, app);

    await authenticatedSession
      .delete(`/api/posts/${this.post.id}`)
      .expect(200)
      .expect("Content-type", /json/)
      .then(async (serverRes) => {
        expect(serverRes.body).toEqual(expect.any(Object));

        const postAfter = await Post.findByPk(this.post.id);
        expect(postAfter).toEqual(null);
      });
  });

  jest.retryTimes(10);
  test("delete /api/posts/:id should delete post if it have a upvote", async () => {
    await this.post.save();
    await Upvote.create({ UserId: this.postUser.id, PostId: this.post.id });

    const authenticatedSession = await loginUser(this.postUser, app);

    await authenticatedSession
      .delete(`/api/posts/${this.post.id}`)
      .expect(200)
      .expect("Content-type", /json/)
      .then(async (serverRes) => {
        expect(serverRes.body).toEqual(expect.any(Object));

        const postAfter = await Post.findByPk(this.post.id);
        expect(postAfter).toEqual(null);
      });
  });

  jest.retryTimes(10);
  test("delete /api/posts/:id should not delete post if not ownned by the logged user", async () => {
    await this.post.save();
    const authenticatedSession = await loginUser(this.user, app);

    await authenticatedSession
      .delete(`/api/posts/${this.post.id}`)
      .expect(401)
      .expect("Content-type", /json/)
      .then(async (serverRes) => {
        expect(serverRes.body).toEqual(expect.any(Object));

        const postAfter = await Post.findByPk(this.post.id);
        expect(postAfter).not.toEqual(null);
      });
  });

  jest.retryTimes(10);
  test("delete /api/posts/:id should not delete post if not logged", async () => {
    await this.post.save();

    await request(app)
      .delete(`/api/posts/${this.post.id}`)
      .expect(401)
      .expect("Content-type", /json/)
      .then(async (serverRes) => {
        expect(serverRes.body).toEqual(expect.any(Object));

        const postAfter = await Post.findByPk(this.post.id);
        expect(postAfter).not.toEqual(null);
      });
  });

  jest.retryTimes(10);
  test("delete /api/posts/:id should not delete post if the post does not exists", async () => {
    await this.post.save();
    const authenticatedSession = await loginUser(this.user, app);

    await authenticatedSession
      .delete("/api/posts/99999999")
      .expect(404)
      .expect("Content-type", /json/)
      .then(async (serverRes) => {
        expect(serverRes.body).toEqual(expect.any(Object));
      });
  });

  jest.retryTimes(10);
  test("get /api/posts/:id should return post if not logged", async () => {
    await this.post.save();

    await request(app)
      .get(`/api/posts/${this.post.id}`)
      .expect(200)
      .expect("Content-type", /json/)
      .then(async (serverRes) => {
        expect(serverRes.body).toEqual(expect.any(Object));
      });
  });


  jest.retryTimes(10);
  test("get /api/posts/:slug should return post", async () => {
    await this.post.save();

    await request(app)
      .get(`/api/posts/${this.post.slug}`)
      .expect(200)
      .expect("Content-type", /json/)
      .then(async (serverRes) => {
        expect(serverRes.body).toEqual(expect.any(Object));
      });
  });

  jest.retryTimes(10);
  test("get /api/posts/:id should return post if logged", async () => {
    await this.post.save();

    const authenticatedSession = await loginUser(this.user, app);

    await authenticatedSession
      .get(`/api/posts/${this.post.id}`)
      .expect(200)
      .expect("Content-type", /json/)
      .then(async (serverRes) => {
        expect(serverRes.body).toEqual(expect.any(Object));
      });
  });

  jest.retryTimes(10);
  test("get /api/posts/:id should return 404 if not found", async () => {
    await this.post.save();

    const authenticatedSession = await loginUser(this.user, app);

    await authenticatedSession
      .get("/api/posts/99999999")
      .expect(404)
      .expect("Content-type", /json/)
      .then(async (serverRes) => {
        expect(serverRes.body).toEqual(expect.any(Object));
      });
  });

  jest.retryTimes(10);
  test("get /api/posts should list posts ordered by creation date", async () => {
    const post1 = await Post.build({ ...postMock, UserId: this.postUser.id });
    await post1.slugfy();
    await post1.save();
    const post2 = await Post.build({ ...postMock, UserId: this.postUser.id });
    await post2.slugfy();
    await post2.save();

    await request(app)
      .get("/api/posts")
      .expect(200)
      .expect("Content-type", /json/)
      .then(async (serverRes) => {
        expect(serverRes.body).toEqual(expect.any(Array));
        expect(serverRes.body[0].id === post1.id).toEqual(true);
        expect(serverRes.body[1].id === post2.id).toEqual(true);
      });
  });

  jest.retryTimes(10);
  test("post /api/posts/:id/upvote should upvote a post", async () => {
    this.post.save();
    const authenticatedSession = await logUser(this.user, app);

    await authenticatedSession
      .post(`/api/posts/${this.post.id}/upvote`)
      .expect(200)
      .expect("Content-type", /json/)
      .then(async (serverRes) => {
        expect(serverRes.body).toEqual(expect.any(Object));

        const upvoteCount = await Upvote.count({ where: { PostId: this.post.id } });
        expect(upvoteCount).toEqual(1);
        const postLater = await Post.findByPk(this.post.id);
        expect(postLater.upvotesCount).toEqual(1);
      });
  });

  jest.retryTimes(10);
  test("post /api/posts/:id/upvote should not upvote if not logged", async () => {
    this.post.save();

    await request(app)
      .post(`/api/posts/${this.post.id}/upvote`)
      .expect(401)
      .expect("Content-type", /json/)
      .then(async (serverRes) => {
        expect(serverRes.body).toEqual(expect.any(Object));

        const upvoteCount = await Upvote.count({ where: { PostId: this.post.id } });
        expect(upvoteCount).toEqual(0);
        const postLater = await Post.findByPk(this.post.id);
        expect(postLater.upvotesCount).toEqual(0);
      });
  });

  jest.retryTimes(10);
  test("post /api/posts/:id/upvote should return 404 if post doenst exist", async () => {
    const authenticatedSession = await logUser(this.user, app);

    await authenticatedSession
      .post("/api/posts/999999/upvote")
      .expect(404)
      .expect("Content-type", /json/)
      .then(async (serverRes) => {
        expect(serverRes.body).toEqual(expect.any(Object));
      });
  });
});
