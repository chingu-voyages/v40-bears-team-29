const { User } = require("../models/index")

const signUp = async (req, res) => {
  const password_hash = await User.hash_password(req.body.password)
  User.create({name: req.body.name, password: password_hash})
    .then(() => {
      res.status(200).send({message: "user created"})
    })
    .catch((error) => {
      res.status(422).send({error: error})
    })
}

const login = async (req, res) => {
  User.findOne({where: {name: req.body.name}})
    .then(async (data) => {
      if(await data.check_password(req.body.password) == false)
        return res.status(401).send({error: "invalid password"});
      // TODO move setting current_user to its own controller helper
      req.session.user_id = data.id
      res.status(200).send({message: `logged in as user ${data.name}`})
    })
    .catch(() => {
      res.status(404).send({error: "user not found"});
    })
};

const loggedUser = async (req,res) => {
  const user_id = req.session.user_id

  if(!user_id)
    return res.status(401).send({error: "you are not logged"})

  // TODO move this check to a controller helper like current_user()
  User.findByPk(user_id)
    .then((data) => {
      // TODO move this filter to its own model helper
      res.status(200).send({user: {...data.toJSON(), password: "[FILTERED]"}})
    })
}

module.exports = { login, loggedUser, signUp };
