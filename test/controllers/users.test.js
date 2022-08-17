/* eslint-env jest */

const app = require('../../app/server/app')
const request = require('supertest')
jest.setTimeout(1000)

const { User } = require('../../app/server/models/index')
const userMock = require('../mocks/user')

const { logUser } = require('./controllers_test_helpers')

describe('users controller', () => {
  beforeEach(async () => {
    this.user = User.build(userMock)
    this.user.username = 'user3'
    this.plainPassword = this.user.password
    await this.user.hashPassword()
  })

  test('post /api/sign_up should create a new user', async () => {
    await request(app)
      .post('/api/sign_up')
      .send({ username: this.user.username, password: this.user.password })
      .expect(200)
      .expect('Content-type', /json/)
      .then(async (serverRes) => {
        expect(serverRes.body).toEqual(expect.any(Object))

        const usersCount = await User.count({ where: { username: this.user.username } })
        expect(usersCount).toEqual(1)

        const createdUser = await User.findByPk(serverRes.body.id)
        expect(createdUser.hasHashedPassword()).toEqual(true)
      })
  })

  test('post /api/sign_up should not create a new user if name is already taken', async () => {
    await this.user.save()

    await request(app)
      .post('/api/sign_up')
      .send({ username: this.user.username, password: this.user.password })
      .expect(409)
      .expect('Content-type', /json/)
      .then(async (serverRes) => {
        expect(serverRes.body).toEqual(expect.any(Object))
        expect(Object.keys(serverRes.body)).toContain('errors')
        expect(serverRes.body.errors.username).toContainEqual(expect.any(Object))

        const usersCount = await User.count({ where: { username: this.user.username } })
        expect(usersCount).toEqual(1)
      })
  })

  test('post /api/login should login if password match', async () => {
    await this.user.save()

    await request(app)
      .post('/api/login')
      .send({ username: this.user.username, password: this.plainPassword })
      .expect(200)
      .expect('Content-type', /json/)
      .then(async (serverRes) => {
        expect(serverRes.body).toEqual(expect.any(Object))
        expect(serverRes.headers).toEqual(expect.objectContaining({ 'set-cookie': expect.any(Object) }))
      })
  })

  test('post /api/login should not login if password does not match', async () => {
    await this.user.save()

    await request(app)
      .post('/api/login')
      .send({ username: this.user.username, password: 'wrong_password' })
      .expect(401)
      .expect('Content-type', /json/)
      .then(async (serverRes) => {
        expect(serverRes.body).toEqual(expect.any(Object))
        expect(serverRes.body).toEqual(
          expect.objectContaining({ error: expect.any(String) })
        )
      })
  })

  test('post /api/login should return an error if not user is found', async () => {
    await request(app)
      .post('/api/login')
      .send({ username: this.user.username, password: this.user.password })
      .expect(404)
      .expect('Content-type', /json/)
      .then(async (serverRes) => {
        expect(serverRes.body).toEqual(expect.any(Object))
        expect(serverRes.body).toEqual(
          expect.objectContaining({ error: expect.any(String) })
        )
      })
  })

  test('get /api/logged_user should return the logged user if logged', async () => {
    const authenticatedSession = await logUser(this.user, app)

    await authenticatedSession
      .get('/api/logged_user')
      .expect(200)
      .expect('Content-type', /json/)
      .then(async (serverRes) => {
        expect(serverRes.body).toEqual(expect.any(Object))
      })
  })

  jest.retryTimes(10)
  test('get /api/logged_user should not return the logged user if not logged', async () => {
    await this.user.save()

    await request(app)
      .get('/api/logged_user')
      .expect(401)
      .expect('Content-type', /json/)
      .then(async (serverRes) => {
        expect(serverRes.body).toEqual(expect.any(Object))
        expect(serverRes.body).toEqual(
          expect.objectContaining({ error: expect.any(String) })
        )
      })
  })

  jest.retryTimes(10)
  test('patch /api/logged_user should update the logged user if logged', async () => {
    const authenticatedSession = await logUser(this.user, app)

    const userBefore = await User.findByPk(this.user.id)

    await authenticatedSession
      .patch('/api/logged_user')
      .send({ username: 'new_name', currentPassword: this.plainPassword, newPassword: 'new_password' })
      .expect(200)
      .expect('Content-type', /json/)
      .then(async (serverRes) => {
        expect(serverRes.body).toEqual(expect.any(Object))

        const userAfter = await User.findByPk(this.user.id)

        expect(userBefore.passwordHash).not.toEqual(userAfter.passwordHash)
        expect(userBefore.username).toEqual(userAfter.username)
      })
  })

  test('patch /api/logged_user should not update the logged user if not logged', async () => {
    await request(app)
      .patch('/api/logged_user')
      .send({ username: 'new_name', password: 'new_password' })
      .expect(401)
      .expect('Content-type', /json/)
      .then(async (serverRes) => {
        expect(serverRes.body).toEqual(expect.any(Object))
        expect(serverRes.body).toEqual(
          expect.objectContaining({ error: expect.any(String) })
        )
      })
  })

  test('get /api/users/:id should return the specific user', async () => {
    const authenticatedSession = await logUser(this.user, app)

    await authenticatedSession
      .get(`/api/users/${this.user.id}`)
      .expect(200)
      .expect('Content-type', /json/)
      .then(async (serverRes) => {
        expect(serverRes.body).toEqual(expect.any(Object))
      })
  })

  test('get /api/users/:id should return 404 the specific user doest exist', async () => {
    const authenticatedSession = await logUser(this.user, app)

    await authenticatedSession
      .get('/api/users/999999')
      .expect(404)
      .expect('Content-type', /json/)
      .then(async (serverRes) => {
        expect(serverRes.body).toEqual(expect.any(Object))
      })
  })

  test('get /api/users/:id should return 401 if not logged', async () => {
    await this.user.save()

    await request(app)
      .get('/api/users/99999')
      .expect(401)
      .expect('Content-type', /json/)
      .then(async (serverRes) => {
        expect(serverRes.body).toEqual(expect.any(Object))
      })
  })
})
