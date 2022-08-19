'use strict'

const models = require('../../app/server/models/index')

const defaultValues = () => {
  return {
    createdAt: new Date(),
    updatedAt: new Date()
  }
}

module.exports = {
  async up (queryInterface, Sequelize) {
    let users = await models.User.findAll()
    users = users.map((u) => u.id)

    let posts = await models.Post.findAll()
    posts = posts.map((p) => p.id)

    const upvotes = []

    users.forEach((userId) => {
      Array.apply(null, Array(10)).forEach(() => {
        const postToUpvote = posts[Math.floor(Math.random() * posts.length)]

        const upvote = {
          PostId: postToUpvote,
          UserId: userId,
          ...defaultValues()
        }

        upvotes.push(upvote)
      })
    })

    await queryInterface.bulkInsert('Upvotes', upvotes, {})
      .catch((e) => { console.log(e) })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Upvotes', null, {})
  }
}
