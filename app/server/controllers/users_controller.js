const { User } = require("../models/index");

const signUp = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const passwordHash = await User.hash_password(req.body.password);
  User.create({ username: req.body.username, password: passwordHash })
    .then((data) => {
      res.status(200).send(data.get_data());
    })
    .catch((error) => {
      res.status(409).json({ message: "User already registered" });
    });
};

const login = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  User.findOne({ where: { username: req.body.username } })
    .then(async (data) => {
      console.log(data.name);

      if ((await data.check_password(req.body.password)) === false) {
        return res.status(401).send({ error: "invalid password" });
      }
      // TODO move setting current_user to its own controller helper
      req.session.user_id = data.id;

      res.status(200).send(data.get_data());
    })
    .catch(() => {
      res.status(404).send({ error: "user not found" });
    });
};

const loggedUser = async (req, res) => {
  const userId = req.session.user_id;

  if (!userId) {
    return res.status(401).send({ error: "you are not logged" });
  }

  const user = await User.get_data_from_id(userId);
  res.status(200).send(user);
};

module.exports = { login, loggedUser, signUp };
