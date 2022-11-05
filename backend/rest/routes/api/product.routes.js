var router = require("express").Router();
//const product = require("../../models/product.model");
const product = require("../../controllers/product.controller");

router.param("slug", product.load_product);
router.post("/", product.create_products);
router.get("/", product.all_products);
router.get("/:slug", product.one_product);
router.get("/list-search/:search", product.search_product);
router.get("/search/:search", product.search);
router.delete("/", product.delete_product);

module.exports = router;
// var router = require("express").Router();
// const product = require("../../models/product.model");

// router.param("slug", async (req, res, next, slug) => {
//   await product.findOne({ slug: slug }).populate("price")
//     .then(function (product) {
//       if (!product) {
//         return res.sendStatus(404);
//       }
//       req.product = product;
//       return next();
//       //res.json(product);
//     })
//     .catch(next);
// });

// router.post("/", async (req, res) => {
//     try {
//       let products;
//       products = new product(req.body);
//       await products.save();
//       res.send(products);
//     }catch (error) {
//       console.log(error);
//       res.status(500).send("Hubo un error");
//     }
// })



// router.get("/", async (req, res) => {
//     try {
//       //let query = {}
//         //res.json(products)
//       query = {}
//       let priceMax = req.query.priceMax;
//       let priceMin = req.query.priceMin;
//       //let price = req.query.price;
//       let state = req.query.state;
//       let name = req.query.name;
//       if ((priceMin) && (!priceMax) && (!state) && (!name)) {
//         query = {price:{$gt:priceMin}};

//       }
//       if ((!priceMin) && (priceMax) && (!state) && (!name)) {
//         query = {price:{$lt:priceMax}};

//       }
//       if ((state) && (!priceMin) && (!priceMax) && (!name)) {
//         query = {state:state}
//       }
//       if ((name) && (!state) && (!priceMin) && (!priceMax)) {
//         query = {name: name}
//       }
//       if ((priceMin) && (state) && (!priceMax) && (!name)) {
//         query = {state:state, price:{$gt:priceMin}}

//       }
//       if ((priceMax) && (state) && (!priceMin) && (!name)) {
//         query = {state:state, price:{$lt:priceMax}}

//       }
//       if ((priceMax) && (priceMin) && (!state) && (!name)){
//         query = {price:{$gt:priceMin,$lt:priceMax}}

//       }
//       if ((priceMin) && (!state) && (!priceMax) && (name)) {
//         query = {name:name, price:{$gt:priceMin}}

//       }
//       if ((priceMax) && (!state) && (!priceMin) && (name)) {
//         query = {name:name, price:{$lt:priceMax}}

//       }
//       if ((priceMax) && (state) && (priceMin) && (!name)) {
//         query = {state:state, price:{$gt:priceMin,$lt:priceMax}}

//       }
//       if ((priceMax) && (!state) && (priceMin) && (name)) {
//         query = {name:name, price:{$gt:priceMin,$lt:priceMax}}

//       }
//       if ((priceMax) && (state) && (!priceMin) && (name)) {
//         query = {state:state,name:name, price:{$lt:priceMax}}

//       }
//       if ((!priceMax) && (state) && (!priceMin) && (name)) {
//         query = {name:name, state:state}

//       }
//       if ((priceMax) && (priceMin) && (state) && (name)) {
//         query = {price:{$gt:priceMin,$lt:priceMax}, state:state, name:name}
//       }
           
//       const products = await product.find(query);   
//       res.json(products.map((product) => product.toJSON())); //product.toJSONFor()
//       } catch (error) {
//         console.log(error);
//         res.status(500).send("Hubo un error, no muestra");
//       }
// })


// router.get("/:slug", async (req, res, next) => {
//   //res.json(req.params.slug)
//   await product.findOne({ slug: req.params.slug }).populate("slug")
//   .then(function (product) {
//     if (!product) {
//       return res.sendStatus(404);
//     }
//     res.json(product);
//     return next();
//   })
//   .catch(next);
// });

// router.get("/list-search/:search", async (req, res) => {
//   try {
//     console.log("LIST_SEARCH!");
//     let search = new RegExp(req.params.search);

//     const Product = await product.find({ name: { $regex: search } }).limit(20);

//     if (!Product) {
//       res.status(404).json({ msg: "No existe el product" });
//     }
//     res.json(Product.map((product) => product.toListJSONFor()));
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Hubo un error en router.get /search/:search");
//   }
// });

// router.get("/search/:search", async (req, res) => {
//   try {
//     console.log("SEARCH");
//     let search = new RegExp(req.params.search);

//     const Product = await product.find({ name: { $regex: search } });

//     if (!Product) {
//       res.status(404).json({ msg: "No existe el product" });
//     }
//     res.json(Product.map((product) => product.toJSONFor()));
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Hubo un error en router.get /search/:search");
//   }
// });


// router.delete("/", async (req, res) => {
//     try {

//     }catch {
        
//     }
// })

