const express = require("express");
const router = express.Router();
const { login, loggedUser, signUp, updateUser, getUser } = require("../controllers/users_controller");

router.post("/api/login", login);
router.get("/api/logged_user", loggedUser);
router.post("/api/sign_up", signUp);
router.patch("/api/logged_user", updateUser);

router.get("/api/users/:username", getUser);

module.exports = router;
