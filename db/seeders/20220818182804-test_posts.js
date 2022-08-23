'use strict'

const models = require('../../app/server/models/index')

const defaultValues = () => {
  return {
    createdAt: new Date(),
    updatedAt: new Date()
  }
}

Date.prototype.addHours = function(h) {
  this.setTime(this.getTime() + (h*60*60*1000));
  return this;
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
        const randomHoursAdded = Math.floor(Math.random() * 20) * -1
        let createdDate = new Date()
        createdDate = createdDate.addHours(randomHoursAdded)

        const place = countries[Math.floor(Math.random() * countries.length)]
        const post = {
          title: `amazing travel to ${place}`,
          content: `really cool travel to ${place} 10/10 i really recommend`,
          UserId: userId,
          createdAt: createdDate,
          updatedAt: createdDate,
          slug: `amazing-travel-to-${place.replace(" ", "-")}-${index}`
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
