/* eslint-env jest */

const models = require("../app/server/models/index");

beforeEach(async () => {
  await models.sequelize.truncate({ cascade: true });
});
