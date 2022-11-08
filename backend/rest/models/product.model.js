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
        maxLength: 1000,
      },
      tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
      img: {
        type: Array
      },
      // img: {
      //   type: String,
      //   lowecase: true,
      //   default: "",
      //   maxLength: 100,
      // },
      price: {
        type: Number,
        required: true,
      },
      date: {
        type: Date,
      },
      state: {
        type: String,
      }
})


ProductSchema.methods.slugify = function () {
    this.slug =
      slug(this.name) +
      "-" +
      ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
};


ProductSchema.methods.toListJSONFor = function () {
  return {
    slug: this.slug,
    name: this.name,
    description: this.description,
    tags: this.tags,
    img: this.img,
    price: this.price,
    date: this.date,
    state: this.state
  };
};


module.exports = mongoose.model("product", ProductSchema);