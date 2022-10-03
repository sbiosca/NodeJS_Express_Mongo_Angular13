var router = require("express").Router();

const product = require("../../models/product.model");

router.post("/", async (req, res) => {
    try {
        
    }catch {

    }
})

router.get("/", async (req, res) => {
    try {
        const products = await product.find();
        res.json(products.map((product) => product.toJSONFor()));
      } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error");
      }
})

router.delete("/", async (req, res) => {
    try {

    }catch {
        
    }
})

module.exports = router;