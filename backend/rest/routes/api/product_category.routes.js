var router = require("express").Router();

const Product_Category = require("../../models/product_category.model");

router.post("/", async (req, res) => {
    try {
      let products_category;
      products_category = new Product_Category(req.body);
      await products_category.save();
      res.send(products_category);
    }catch (error) {
      console.log(error);
      res.status(500).send("Hubo un error");
    }
})

router.get("/:id", async (req, res) => {
    try {
      let product_category = await Product_Category.findOne({ ref: req.params.reference });
      
      if (!product_category) {
        res.status(404).json({ msg: "No existe la categoria" });
      }
      res.json(product_category);
    } catch (error) {
      console.log(error);
      res.status(500).send("Hubo un error");
    }
  });

  module.exports = router;