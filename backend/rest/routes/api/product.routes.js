var router = require("express").Router();
//const product = require("../../models/product.model");
const product = require("../../controllers/product.controller");
const auth = require('../auth');

router.param("slug", product.load_product);
router.post("/", product.create_products);
router.get("/", product.all_products);
router.get("/:slug", product.one_product);
router.get("/list-search/:search", product.search_product);
router.get("/search/:search", product.search);
router.delete("/", product.delete_product);
router.get("/user/favorite", auth.required, product.getfavorite);
router.post("/:slug/favorite", auth.required, product.addfavorite);
router.delete("/:slug/favorite", auth.required, product.deletefavorite);
router.get("/:id/product", auth.required, product.getproduct_user);

module.exports = router;
