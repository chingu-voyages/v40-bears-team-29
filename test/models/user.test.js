/* eslint-env jest */

jest.setTimeout(20000)

const { User } = require('../../app/server/models/index')
const userMock = require('../mocks/user')

const { validate } = require('./model_test_helper')

describe('user model', () => {
  beforeEach(async () => {
    this.user = User.build(userMock)
    this.plainPassword = this.user.password
    await this.user.hashPassword()
  })

  test('user should be invalid with a username of 17 chars', async () => {
    this.user.username = 'a'.repeat(17)

    const hasErrors = await validate(this.user)

    expect(hasErrors.errors.username.length > 0).toEqual(true)
  })

  test('user should be invalid with a username of 2 chars', async () => {
    this.user.username = 'a'.repeat(2)

    const hasErrors = await validate(this.user)

    expect(hasErrors.errors.username.length > 0).toEqual(true)
  })

  test('user should be invalid with a username of that has special characters', async () => {
    this.user.username = 'a%$#@'

    const hasErrors = await validate(this.user)

    expect(hasErrors.errors.username.length > 0).toEqual(true)
  })

  test('user should be invalid with a password of 5 chars', async () => {
    this.user.password = 'a'.repeat(5)

    const hasErrors = await validate(this.user)

    expect(hasErrors.errors.password.length > 0).toEqual(true)
  })

  test('user should be invalid with a password of 33 chars', async () => {
    this.user.password = 'a'.repeat(33)
    const hasErrors = await validate(this.user)

    expect(hasErrors.errors.password.length > 0).toEqual(true)
  })
})
