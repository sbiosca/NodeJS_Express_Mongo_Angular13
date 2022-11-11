const mongoose = require("mongoose");
var slug = require("slug");
const { schema } = require('../models/User.model');
const User = mongoose.model('User', schema);

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
      author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      img: {
        type: Array
      },
      price: {
        type: Number,
        required: true,
      },
      date: {
        type: Date,
      },
      state: {
        type: String,
      },
      favorites: {
        type: Number,
        default: 0,
      },
      favorited: {
        type: Boolean,
        default: false,
      }
})


ProductSchema.methods.slugify = function () {
    this.slug =
      slug(this.name) +
      "-" +
      ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
};

ProductSchema.methods.favoriteCount = function () {
  var product = this;

  return User.countDocuments({ favorites: { $in: [product._id] } }).then(
    function (count) {
      product.favorites = count;
      return product.save();
    }
  );
};

ProductSchema.methods.toListJSONFor = function (user = undefined) {
  return {
    slug: this.slug,
    name: this.name,
    description: this.description,
    tags: this.tags,
    img: this.img,
    price: this.price,
    date: this.date,
    state: this.state,
    favorites: this.favorites,
    favorited: user ? user.isFavorite(this._id) : false,
  };
};

ProductSchema.methods.toAuthorJSON = function (user = undefined) {
  return {
    slug: this.slug,
    name: this.name,
    description: this.description,
    tags: this.tags,
    img: this.img,
    price: this.price,
    date: this.date,
    state: this.state,
    favorites: this.favorites,
    favorited: user ? user.isFavorite(this._id) : false,
    author: this.author
  };
};

module.exports = mongoose.model("product", ProductSchema);