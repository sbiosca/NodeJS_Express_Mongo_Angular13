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
      type: String
    },
  });


CategorySchema.methods.slugify = function () {
    this.slug =
      slug(this.name_category);
  };

module.exports = mongoose.model("Category", CategorySchema);