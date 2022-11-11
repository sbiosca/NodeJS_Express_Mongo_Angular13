const product = require("../models/product.model");
const category = require("../models/category.model");
const mongoose = require('mongoose');
const { schema } = require('../models/User.model');
const User = mongoose.model('User', schema);

exports.load_product = async (req, res, next, slug) => {
    await product.findOne({ slug: slug }).populate("price")
        .then(function (product) {
            if (!product) {
                return res.sendStatus(404);
            }
            req.product = product;
            return next();
            //res.json(product);
        })
        .catch(next);
}

exports.create_products = async (req, res) => {
    try {
        let products;
        products = new product(req.body);
        await products.save();
        res.send(products);
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error");
    }
}

exports.all_products = async (req, res) => {
    try {
        query = {}
        let listcategory = req.query.listcategory;
        let priceMax = req.query.priceMax;
        let priceMin = req.query.priceMin;
        let state = req.query.state;
        let name = req.query.name;

        if (listcategory != undefined) {
          query["categories-home.reference"]=parseInt(listcategory);
        }
        if(priceMin && !priceMax) {
          query.price = { $gt: parseInt(priceMin)}
        }
        if(priceMax && !priceMin) {
          query.price ={ $lt: parseInt(priceMax)}
        }
        if(priceMax && priceMin) {
          query.price ={ $gt: parseInt(priceMin),$lt: parseInt(priceMax)}
        }
        if(state) {
          query.state = state
        }
        if(name) {
          query.name = name
        }

        let products = ""
        if (listcategory != undefined) {
          products = await product.aggregate([{"$lookup":{"from":"categories","foreignField":"products","localField":"_id","as":"categories-home"}},{"$match": query},{"$project":{"categories-home":0}}])
        } else {
          products = await product.find(query);
        }
      
        res.json(products)
        // .map((product) => product.toJSON()));

    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error, no muestra");
    }
}

exports.one_product = async (req, res, next) => {
    await product.findOne({ slug: req.params.slug }).populate("slug")
        .then(function (product) {
            if (!product) {
                return res.sendStatus(404);
            }
            res.json(product);
            return next();
        })
        .catch(next);
}

exports.search_product = async (req, res) => {
    try {
        //onsole.log("LIST_SEARCH!");
        let search = new RegExp(req.params.search);

        const Product = await product.find({ name: { $regex: search } }).limit(20);

        if (!Product) {
            res.status(404).json({ msg: "No existe el product" });
        }
        res.json(Product.map((product) => product.toListJSONFor()));
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error en router.get /search/:search");
    }
}

exports.search = async (req, res) => {
    try {
        console.log("SEARCH");
        let search = new RegExp(req.params.search);

        const Product = await product.find({ name: { $regex: search } });

        if (!Product) {
            res.status(404).json({ msg: "No existe el product" });
        }
        res.json(Product.map((product) => product.toJSONFor()));
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error en router.get /search/:search");
    }
}

exports.delete_product = async (req, res) => {

}

exports.addfavorite = async (req, res, next) => {
    if (!req.product) {
        Product.findOne({ slug: req.params.slug }).then(function (product) {
          if (!product) res.status(404).json({ msg: "No existe el product" });
          var productId = product._id;
    
        //   User.findById(product.author).then(function (user) {
        //     if (!user) return res.sendStatus(401);
        //     user.updateKarmaSave(10, user);
        //   }).catch(next);
    
          User.findById(req.auth.id).then(function (user) {
            if (!user) return res.sendStatus(401);
            return user.favorite(productId).then(function () {
              return product.favoriteCount().then(function (product) {
                return res.json( product.toJSONFor(user));
              });
            });
          }).catch(next);
        }).catch(function (err) {
          console.log(err)
          res.json(err)
        });
    
    
      } else {
        var productId = req.product._id;
    
        // User.findById(req.product.author).then(function (user) {
        //     if (!user) return res.sendStatus(401);
        //     user.updateKarmaSave(10, user);
        // })
        // .catch(next);
        User.findById(req.auth.id).then(function (user) {
          if (!user) return res.sendStatus(402);
    
          return user.favorite(productId).then(function () {
            return req.product.favoriteCount().then(function (product) {
              return res.json(product.toListJSONFor(user) );
            });
          });
        }).catch(next);
      }
}

exports.deletefavorite = async (req, res, next) => {
    if (!req.product) {
        Product.findOne({ slug: req.params.slug }).then(function (product) {
          if (!product) res.status(404).json({ msg: "No existe el product" });
          var productId = product._id;
    
        //   User.findById(product.author).then(function (user) {
        //     if (!user) return res.sendStatus(401);
        //     user.updateKarmaSave(-10, user);
        //   }).catch(next);
    
          User.findById(req.auth.id).then(function (user) {
            if (!user) return res.sendStatus(401);
            return user.unfavorite(productId).then(function () {
              return product.favoriteCount().then(function (product) {
                return res.json(product.toListJSONFor(user) );
              });
            });
          }).catch(next);
        }).catch(function (err) {
          console.log(err)
          res.json(err)
        });
    
    
      } else {
        var productId = req.product._id;
        
        // User.findById(req.product.author).then(function (user) {
        //   if (!user) return res.sendStatus(401);
        //   user.updateKarmaSave(-10, user);
        // })      .catch(next);
        User.findById(req.auth.id).then(function (user) {
          if (!user) return res.sendStatus(401);
    
          return user.unfavorite(productId).then(function () {
            return req.product.favoriteCount().then(function (product) {
              return res.json(product.toListJSONFor(user));
            });
          });
        }).catch(next);
      }
}

exports.getfavorite = async (req, res) => {
  try {
    const user = await User.findById(req.auth.id);
    const products = await product.find({_id: user.favorites}).populate("author");
    if (products) {
      return res.json(products.map(product => product.toAuthorJSON(user)));
    }
  } catch (error) {
    console.log(error)
    //res.status(500).json({msg: "An error has ocurred"});
  }
};

exports.getproduct_user = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const products = await product.find({_id: user.products}).populate("author");
    //console.log(products)
    if (products) {
      return res.json(products.map(product => product.toAuthorJSON(user)));
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({msg: "An error has ocurred"});
  }
};