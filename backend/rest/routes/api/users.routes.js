const router = require('express').Router();
const auth = require('../auth');
const user = require("../../controllers/users.controller");

router.get("/user", auth.required, user.get_users);
router.post("/users/login", user.login_user);
router.post("/users", user.register_user);
router.put("/user", auth.required, user.update_user);

module.exports = router;
