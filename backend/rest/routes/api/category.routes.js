var router = require("express").Router();
const Category = require("../../controllers/category.controller");

router.post("/", Category.create_category);
router.get("/", Category.list_category);
router.get("/categories", Category.all_categories);
router.get("/:reference", Category.category_reference);
router.delete("/:id", Category.delete_category);

module.exports = router;

