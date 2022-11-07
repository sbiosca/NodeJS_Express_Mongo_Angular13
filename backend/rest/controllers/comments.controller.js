const mongoose = require("mongoose");
const { schema } = require('../models/comment.model');
const { schema_user } = require('../models/User.model');
const { schema_product } = require('../models/product.model');
const Comment = mongoose.model('Comment', schema);
const User = mongoose.model('User', schema_user);
const Product = mongoose.model('product', schema_product);
//const Category = require("../../models/category.model");

exports.list_Comment = async (req, res, next) => {
    var productSlug = req.params.product;
    //console.log(productSlug)
    Promise.resolve(req.payload ? User.findById(req.payload.id) : null)
        .then(function (user) {
            Product.findOne({ slug: productSlug })
                .then(function (product) {
                    return res.json({
                        comments: product.tags.map(function (comment) {
                            //return comment.toJSONFor(comment.author);
                            return comment;
                        }),
                    });
                });
        })
        .catch(next);
}

exports.create_comment = async (req, res, next) => {
    var productSlug = req.params.product;
    console.log(req.auth.id)
    try {
        await User.findById(req.auth.id)
            .then(function (user) {
                if (!user) return res.sendStatus(401);
                
                user.updateKarmaSave(5, user);
 
                var comment = new Comment(req.body);
                console.log(comment);
                Product.findOne({ slug: productSlug }).then(function (product) {
                    if (!product) return res.sendStatus(404);
                    
                    comment.author = user._id;
                    comment.product = product._id;
                    return comment.save().then(function () {
                        
                        product.tags.push(comment);
                        
                        return product.save().then(function () {
                            res.json({ comment: comment.toJSONFor(user) });
                        });
                    });
                });
            })
            .catch(next);
    } catch (error) {
        console.log(error);
        res.status(500).send("Fallo crear comment");
    }
}

exports.delete_Comment = async(req, res, next) => {
    console.log("delete_comment")
    let idComment = req.params.comment;
    let productSlug = req.params.article;

    try {
        User.findById(req.auth.id)
            .then(function (user) {
                if (!user) {
                    return res.sendStatus(401);
                }
                user.updateKarmaSave(-5, user);
            })
            .catch(next);

        await Comment.findById(idComment).then(function (comment) {
            if (!comment) return res.sendStatus(404);
            if (comment.author.toString() === req.payload.id.toString()) {
            Product.findOne({ slug: productSlug }).then(function (product) {
                if (!product) return res.sendStatus(404);
              
                product.comments.remove(idComment);
                product.save();
                comment.remove();
                res.sendStatus(204);
            });
            } else {
                res.sendStatus(403);
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error");
    }
}