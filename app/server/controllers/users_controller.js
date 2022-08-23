const { User, Post, Upvote } = require("../models/index");
const { filterParams, currentUser, loginUser, handleError, authenticateUser } = require("./application_controller");

const signUp = async (req, res) => {
  const user = await setUser(userParams(req));

  user.save()
    .then(async (data) => {
      res.status(200).send(data.getData());
    })
    .catch((error) => {
      let responseStatus = 422;
      if (error.errors) {
        error.errors.forEach((e) => {
          if (e.type === "unique violation") {
            responseStatus = 409;
          }
        });
      }
      handleError(error, res, responseStatus);
    });
};

const login = async (req, res) => {
  User.findOne({ where: { username: req.body.username } })
    .then(async (data) => {
      const user = await loginUser(req, data, req.body.password);
      if (user === null) {
        res.status(401).send({ error: "invalid password" });
      } else {
        res.status(200).send(user.getData());
      }
    })
    .catch(() => {
      res.status(404).send({ error: "user not found" });
    });
};

const loggedUser = async (req, res) => {
  const user = await currentUser(req);

  if (user === null) {
    res.status(401).send({ error: "you are not logged" });
  } else {
    res.status(200).send(user.getData());
  }
};

const updateUser = async (req, res) => {
  const user = await currentUser(req);

  if (user == null) {
    res.status(401).send({ error: "you are not logged" });
    return;
  }

  const newValues = { ...userParams(req), password: null };
  delete newValues.username;

  if (!req.body.currentPassword) {
    res.status(422).send({ error: "you need to send your currentPassword to update your user" });
    return;
  }

  if (await user.checkPassword(req.body.currentPassword) === false) {
    res.status(401).send({ error: "your currentPassword doest match" });
    return;
  }

  user.set({ ...newValues, password: req.body.newPassword || req.body.currentPassword, passwordHash: null });
  await user.hashPassword();

  user.save()
    .then(async (data) => {
      res.status(200).send(data.getData());
    })
    .catch((error) => {
      handleError(error, res);
    });
};

const getUser = async (req, res) => {
  if (!authenticateUser(req, res)) {
    return;
  }

  const user = await User.findOne({where: {username: req.params.username}});

  if (user === null) {
    res.status(404).send({ error: "this user doest exist" });
  } else {
    const cursor = req.query.cursor || 0;
    const limit = req.query.limit || 10;

    const data = user.getData();

    const posts = await Post.findAll({ offset: cursor, limit, order: [["createdAt", "ASC"]], where: { UserId: user.id }, ...Post.fullScope(User, Upvote) });

    data.Posts = posts.map((p) => p.getData());

    res.status(200).send(data);
  }
};

// helpers ///////////////////////////////////////////

const setUser = async (params) => {
  const user = User.build(params);
  if (user.password) {
    await user.hashPassword();
  }
  return user;
};

// strong parameters
const userParams = (req) => {
  const permittedParams = [
    "username",
    "password",
    "biography",
    "displayName",
    "avatar"
  ];
  return filterParams(permittedParams, req);
};

module.exports = { login, loggedUser, signUp, updateUser, getUser };
