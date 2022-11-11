const mongoose = require("mongoose");
//const uniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const secret = require('../config').secret;

const UserSchema = new mongoose.Schema({
    username: {type: String, lowercase: true, unique: true, required: [true, "can't be blank,"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
    email: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
    bio: String,
    image: String,
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'product' }],
    following: [{ type: mongoose.Schema.Types.ObjectId , ref: 'User' }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    hash: String,
    salt: String
}, {timestamps: true});

UserSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

UserSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.generateJWT = function() {
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    id: this._id,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000),
  }, secret);
};

UserSchema.methods.favorite = function (id) {
  if (this.favorites.indexOf(id) === -1) {
    this.favorites.push(id);
  }
  return this.save();
};

UserSchema.methods.unfavorite = function (id) {
  this.favorites.remove(id);
  return this.save();
};

UserSchema.methods.isFavorite = function (id) {
  return this.favorites.some(function (favoriteId) {
    return favoriteId.toString() === id.toString();
  });
};

UserSchema.methods.follow = function (id, userFollow) {
  if (userFollow.followers.indexOf(this._id) === -1) {
    userFollow.followers.push(this._id);
  }
  userFollow.save();
  
  console.log
  if (this.following.indexOf(id) === -1) {
    this.following.push(id);
  }
  return this.save();
};

UserSchema.methods.unfollow = function (id, userFollowed) {

  userFollowed.followers.remove(this._id);
  userFollowed.save();
  
  this.following.remove(id);
  return this.save();
};

UserSchema.methods.isFollowing = function (id) {
  return this.following.some(function (followId) {
    return followId.toString() === id.toString();
  });
};

UserSchema.methods.toAuthJSON = function(){
  return {
    id: this._id,
    username: this.username,
    email: this.email,
    token: this.generateJWT(),
    bio: this.bio,
    image: this.image
  };
};

UserSchema.methods.updateKarmaSave = function (qty, userKarma) {
  userKarma.karma = userKarma.karma + qty;
  return userKarma.save();
};

UserSchema.methods.toProfileJSONFor = function(user = undefined){
  return {
    id: this._id,
    username: this.username,
    bio: this.bio,
    email: this.email,
    image: this.image || 'https://www.ibei.org/images/4611/person_box.png',
    following: user ? user.isFollowing(this._id) : false,
    followers: this.followers,
  };
};

mongoose.model('User', UserSchema);