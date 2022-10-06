const mongoose = require("mongoose");

const ProductCategorySchema = mongoose.Schema({
    ref:{
      type: Number,
      required: true,
    },
    product:{
      type: Number,
      required: true,
    },
    category:{
      type: Number,
      required: true,
    }
  })

  module.exports = mongoose.model("ProductCategory", ProductCategorySchema); 

  