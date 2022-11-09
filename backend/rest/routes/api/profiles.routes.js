const router = require('express').Router();
const profile = require('../../controllers/profiles.controller')
const auth = require('../auth');

router.param("username", profile.load_user);
router.get("/:username", auth.optional, profile.get_username);
router.post("/:username/follow", auth.required, profile.follow_user);
router.delete("/:username/follow", auth.required, profile.delete_follow);

module.exports = router;
