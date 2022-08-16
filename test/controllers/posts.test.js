/* eslint-env jest */

const app = require('../../app/server/app')
const request = require('supertest')
jest.setTimeout(20000)

const { User, Post } = require('../../app/server/models/index')
const postMock = require('../mocks/post')
const userMock = require('../mocks/user')

const { logUser, loginUser } = require('./controllers_test_helpers')

describe('posts controller', () => {
  beforeEach(async () => {
    this.user = User.build({ ...userMock, username: 'original' })
    await this.user.hashPassword()
    this.userPlainPassword = this.user.password

    this.postUser = User.build({ ...userMock, username: 'user9' })
    await this.postUser.hashPassword()
    this.postUserPlainPassword = this.postUser.password
    await this.postUser.save()

    this.post = await Post.build({ ...postMock, UserId: this.postUser.id })
  })

  jest.retryTimes(10)
  test('post /api/posts should create a new post', async () => {
    const authenticatedSession = await logUser(this.user, app)

    await authenticatedSession
      .post('/api/posts')
      .send({ title: this.post.title, content: this.post.content })
      .expect(200)
      .expect('Content-type', /json/)
      .then(async (serverRes) => {
        expect(serverRes.body).toEqual(expect.any(Object))

        const postsCount = await Post.count({ where: { title: this.post.title } })
        expect(postsCount).toEqual(1)
      })
  })

  jest.retryTimes(10)
  test('post /api/posts should not create a new post if not logged', async () => {
    await request(app)
      .post('/api/posts')
      .send({ title: this.post.title, content: this.post.content })
      .expect(401)
      .expect('Content-type', /json/)
      .then(async (serverRes) => {
        expect(serverRes.body).toEqual(expect.any(Object))

        const postsCount = await Post.count({ where: { title: this.post.title } })
        expect(postsCount).toEqual(0)
      })
  })

  jest.retryTimes(10)
  test('post /api/posts should not create a new post if the post is invalid', async () => {
    const authenticatedSession = await logUser(this.user, app)

    await authenticatedSession
      .post('/api/posts')
      .send({ title: '', content: this.post.content })
      .expect(422)
      .expect('Content-type', /json/)
      .then(async (serverRes) => {
        expect(serverRes.body).toEqual(expect.any(Object))

        const postsCount = await Post.count({ where: { title: this.post.title } })
        expect(postsCount).toEqual(0)
      })
  })

  jest.retryTimes(10)
  test('patch /api/posts should update post if logged', async () => {
    await this.post.save()
    const authenticatedSession = await loginUser(this.postUser, app)

    const newContent = 'new contentttt'
    await authenticatedSession
      .patch(`/api/posts/${this.post.id}`)
      .send({ content: newContent })
      .expect(200)
      .expect('Content-type', /json/)
      .then(async (serverRes) => {
        expect(serverRes.body).toEqual(expect.any(Object))

        const postAfter = await Post.findByPk(this.post.id)
        expect(postAfter.content).toEqual(newContent)
      })
  })

  jest.retryTimes(10)
  test('patch /api/posts should not update post if invalid', async () => {
    await this.post.save()
    const authenticatedSession = await loginUser(this.postUser, app)

    const newContent = ''
    await authenticatedSession
      .patch(`/api/posts/${this.post.id}`)
      .send({ content: newContent })
      .expect(422)
      .expect('Content-type', /json/)
      .then(async (serverRes) => {
        expect(serverRes.body).toEqual(expect.any(Object))

        const postAfter = await Post.findByPk(this.post.id)
        expect(postAfter.content).toEqual(this.post.content)
      })
  })

  jest.retryTimes(10)
  test('patch /api/posts should not update post if not logged', async () => {
    await this.post.save()
    const newContent = 'new contentttt'

    await request(app)
      .patch(`/api/posts/${this.post.id}`)
      .send({ content: newContent })
      .expect(401)
      .expect('Content-type', /json/)
      .then(async (serverRes) => {
        expect(serverRes.body).toEqual(expect.any(Object))

        const postAfter = await Post.findByPk(this.post.id)
        expect(postAfter.content).toEqual(this.post.content)
      })
  })

  jest.retryTimes(10)
  test('patch /api/posts should not update post if not it doest exists', async () => {
    const authenticatedSession = await loginUser(this.user, app)

    await authenticatedSession
      .patch('/api/posts/99999999')
      .send({ content: 'aaaaaaaa' })
      .expect(404)
      .expect('Content-type', /json/)
      .then(async (serverRes) => {
        expect(serverRes.body).toEqual(expect.any(Object))
      })
  })

  jest.retryTimes(10)
  test('delete /api/posts/:id should delete post ', async () => {
    await this.post.save()
    const authenticatedSession = await loginUser(this.postUser, app)

    await authenticatedSession
      .delete(`/api/posts/${this.post.id}`)
      .expect(200)
      .expect('Content-type', /json/)
      .then(async (serverRes) => {
        expect(serverRes.body).toEqual(expect.any(Object))

        const postAfter = await Post.findByPk(this.post.id)
        expect(postAfter).toEqual(null)
      })
  })

  jest.retryTimes(10)
  test('delete /api/posts/:id should not delete post if not ownned by the logged user', async () => {
    await this.post.save()
    const authenticatedSession = await loginUser(this.user, app)

    await authenticatedSession
      .delete(`/api/posts/${this.post.id}`)
      .expect(401)
      .expect('Content-type', /json/)
      .then(async (serverRes) => {
        expect(serverRes.body).toEqual(expect.any(Object))

        const postAfter = await Post.findByPk(this.post.id)
        expect(postAfter).not.toEqual(null)
      })
  })

  jest.retryTimes(10)
  test('delete /api/posts/:id should not delete post if not logged', async () => {
    await this.post.save()
    const authenticatedSession = await loginUser(this.user, app)

    await authenticatedSession
      .delete(`/api/posts/${this.post.id}`)
      .expect(401)
      .expect('Content-type', /json/)
      .then(async (serverRes) => {
        expect(serverRes.body).toEqual(expect.any(Object))

        const postAfter = await Post.findByPk(this.post.id)
        expect(postAfter).not.toEqual(null)
      })
  })

  jest.retryTimes(10)
  test('delete /api/posts/:id should not delete post if the post does not exists', async () => {
    await this.post.save()
    const authenticatedSession = await loginUser(this.user, app)

    await authenticatedSession
      .delete('/api/posts/99999999')
      .expect(404)
      .expect('Content-type', /json/)
      .then(async (serverRes) => {
        expect(serverRes.body).toEqual(expect.any(Object))
      })
  })

  jest.retryTimes(10)
  test('get /api/posts/:id should return post if not logged', async () => {
    await this.post.save()

    await request(app)
      .get(`/api/posts/${this.post.id}`)
      .expect(200)
      .expect('Content-type', /json/)
      .then(async (serverRes) => {
        expect(serverRes.body).toEqual(expect.any(Object))
      })
  })

  jest.retryTimes(10)
  test('get /api/posts/:id should return post if logged', async () => {
    await this.post.save()

    const authenticatedSession = await loginUser(this.user, app)

    await authenticatedSession
      .get(`/api/posts/${this.post.id}`)
      .expect(200)
      .expect('Content-type', /json/)
      .then(async (serverRes) => {
        expect(serverRes.body).toEqual(expect.any(Object))
      })
  })

  jest.retryTimes(10)
  test('get /api/posts/:id should return 404 if not found', async () => {
    await this.post.save()

    const authenticatedSession = await loginUser(this.user, app)

    await authenticatedSession
      .get('/api/posts/99999999')
      .expect(404)
      .expect('Content-type', /json/)
      .then(async (serverRes) => {
        expect(serverRes.body).toEqual(expect.any(Object))
      })
  })
})
