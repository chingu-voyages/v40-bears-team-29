/* eslint-env jest */

const { User, Post } = require('../../app/server/models/index')
const { validate } = require('./model_test_helper')
const postMock = require('../mocks/post')
const userMock = require('../mocks/user')

describe('post model', () => {
  beforeEach(async () => {
    this.user = User.build(userMock)
    await this.user.hashPassword()
    this.plainPassword = this.user.password
    await this.user.save()

    this.post = Post.build({ ...postMock, UserId: this.user.id })
  })

  test('post should be valid with valid values', async () => {
    const hasErrors = await validate(this.post)

    expect(hasErrors).toEqual(false)
  })

  test('post should be invalid with a title of 129 chars', async () => {
    this.post.title = 'a'.repeat(129)

    const hasErrors = await validate(this.post)

    expect(hasErrors.errors.title.length > 0).toEqual(true)
  })

  test('post should be invalid with a content of 3001 chars', async () => {
    this.post.content = 'a'.repeat(5000)

    const hasErrors = await validate(this.post)
    console.log(hasErrors)

    expect(hasErrors.errors.content.length > 0).toEqual(true)
  })
})
