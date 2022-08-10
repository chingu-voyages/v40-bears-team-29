const express = require("express");
const router = express.Router();
const { login, loggedUser, signUp } = require("../controllers/users_controller");

router.post("/api/login", login);
router.get("/api/logged_user", loggedUser);
router.post("/api/sign_up", signUp);

module.exports = router;
