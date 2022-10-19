var router = require("express").Router();

const product = require("../../models/product.model");

router.param("slug", async (req, res, next, slug) => {
  // let param = req.params.slug.slice(4)
  
  // if (param === "price") {
  //   res.json(param)
  // }
  await product.findOne({ slug: slug }).populate("price")
    .then(function (product) {
      if (!product) {
        return res.sendStatus(404);
      }
      req.product = product;
      return next();
      //res.json(product);
    })
    .catch(next);
});

router.post("/", async (req, res) => {
    try {
      let products;
      products = new product(req.body);
      await products.save();
      res.send(products);
    }catch (error) {
      console.log(error);
      res.status(500).send("Hubo un error");
    }
})



router.get("/", async (req, res) => {
    try {
      const products = await product.find();
      let query = {}
      let price = req.query.price;
      //res.json(price);
      res.json(products.map((product) => product.toJSON())); //product.toJSONFor()

      } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error, no muestra");
      }
})


router.get("/:slug", async (req, res, next) => {
  //res.json(req.params.slug)
  await product.findOne({ slug: req.params.slug }).populate("slug")
  .then(function (product) {
    if (!product) {
      return res.sendStatus(404);
    }
    res.json(product);
    return next();
  })
  .catch(next);
});



router.delete("/", async (req, res) => {
    try {

    }catch {
        
    }
})

module.exports = router;