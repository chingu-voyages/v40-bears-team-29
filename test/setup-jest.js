// const matchers = require('jest-extended');
// expect.extend(matchers);

models = require("../app/server/models/index")

beforeEach(async () => {
  await models.sequelize.truncate({ cascade: true })
});
