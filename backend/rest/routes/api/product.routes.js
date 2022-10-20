var router = require("express").Router();

const product = require("../../models/product.model");

router.param("slug", async (req, res, next, slug) => {
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
      //let query = {}
      
      
      
        //res.json(products)
      let priceMax = req.query.priceMax;
      let priceMin = req.query.priceMin;
      //let price = req.query.price;
      let state = req.query.state;
      let cate = req.query.listcategory;
      if ((priceMin) && (!priceMax) && (!state)) {
        query = {price:{$gt:priceMin}};

      }else if ((!priceMin) && (priceMax) && (!state)) {
        query = {price:{$lt:priceMax}};

      }else if((state) && (!priceMin) && (!priceMax)) {
        query = {state:state}

      }else if((priceMin) && (state) && (!priceMax)) {
        query = {state:state, price:{$gt:priceMin}}

      }else if ((priceMax) && (state) && (!priceMin)) {
        query = {state:state, price:{$lt:priceMax}}

      }else if((priceMax) && (priceMin) && (!state)){
        query = {price:{$gt:priceMin,$lt:priceMax}}

      }else if((priceMax) && (priceMin) && (state)) {
        query = {price:{$gt:priceMin,$lt:priceMax}, state:state}
        
      }
      else {
        query = {}
      } 
      
      const products = await product.find(query);   
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