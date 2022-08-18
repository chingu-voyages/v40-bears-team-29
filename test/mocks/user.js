const random = (length = 8) => {
  return Math.random().toString(16).substr(2, length);
};

const user = {
  username: random(5),
  password: `password${Math.random()}`
};

module.exports = user;
