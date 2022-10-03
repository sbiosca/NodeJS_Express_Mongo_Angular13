const mongoose = require("mongoose");
var slug = require("slug");

const ProductSchema = mongoose.Schema({
    slug: {
        type: String,
        lowecase: true,
        unique: true,
      },
      name: {
        type: String,
        lowecase: true,
        required: true,
      },
      description: {
        type: String,
        lowecase: true,
        default: "",
        maxLength: 300,
      },
})


ProductSchema.methods.slugify = function () {
    this.slug =
      slug(this.name) +
      "-" +
      ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
};

module.exports = mongoose.model("product", ProductSchema);