const session = require("supertest-session");

const logUser = async (user, app) => {
  await user.save();

  const authenticatedSession = session(app);
  await authenticatedSession.post("/api/login")
    .send({ username: user.username, password: user.password });

  return authenticatedSession;
};

const loginUser = async (user, app) => {
  const authenticatedSession = session(app);
  await authenticatedSession.post("/api/login")
    .send({ username: user.username, password: user.password });

  return authenticatedSession;
};

module.exports = { logUser, loginUser };
