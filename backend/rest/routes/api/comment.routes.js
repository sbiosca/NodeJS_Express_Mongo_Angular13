var router = require("express").Router();
const auth = require('../auth');
const Comment = require("../../controllers/comments.controller");

router.post("/:product", auth.required, Comment.create_comment);
router.get("/:product", auth.optional, Comment.list_Comment);
router.delete("/:product/:comment", auth.required, Comment.delete_Comment);

module.exports = router;