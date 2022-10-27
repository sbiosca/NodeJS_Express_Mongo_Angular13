const mongoose = require("mongoose");

var slug = require("slug");


const CategorySchema = mongoose.Schema({
  slug: {
    type: String,
    lowecase: true,
    unique: true,
  },
  reference: {
    type: Number,
    required: true,
  },
  icon: {
    prefix:
      {type: String, required: true},
    name:
      {type: String, required: true}
  },
  name_category: {
    type: String,
    required: true,
  },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
  visited: {
    type: Number
  }
});


CategorySchema.pre("validate", function (next) {
  if (!this.slug) {
    this.slugify();
  }
  next();
});

CategorySchema.methods.slugify = function () {
  this.slug =
    slug(this.name_category);
};

CategorySchema.methods.toListJSONFor = function () {
  return {
    reference: this.reference,
    name_category: this.name_category,
    slug: this.slug,
    icon: this.icon,
    products: this.products,
    visited: this.visited
  };
};

module.exports = mongoose.model("Category", CategorySchema);


