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
    // console.log(users)

    const countries = ['bosnia', 'equador', 'botswana', 'myanmar', 'timor leste']

    const posts = []

    let index = 0
    users.forEach((userId) => {
      Array.apply(null, Array(10)).forEach(() => {
        const place = countries[Math.floor(Math.random() * countries.length)]
        const post = {
          title: `amazing travel to ${place}`,
          content: `really cool travel to ${place} 10/10 i really recommend`,
          UserId: userId,
          slug: `amazing-travel-to-${place.replace(" ", "-")}-${index}`,
          ...defaultValues()
        }
        posts.push(post)
        index += 1
      })
    })

    // console.log(posts)

    await queryInterface.bulkInsert('Posts', posts, {})
      .catch((e) => { console.log(e) })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Posts', null, {})
  }
}
