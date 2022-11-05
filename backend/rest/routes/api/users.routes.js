const router = require('express').Router();
const auth = require('../auth');
const user = require("../../controllers/users.controller");

router.get("/user", auth.required, user.get_users);
router.post("/users/login", user.login_user);
router.post("/users", user.register_user);
router.put("/user", auth.required, user.update_user);

module.exports = router;
// const mongoose = require('mongoose');
// const router = require('express').Router();
// const passport = require('passport');
// const { schema } = require('../../models/User.model');
// const User = mongoose.model('User', schema);
// const auth = require('../auth');


// router.get('/user', auth.required, function(req, res, next){
//   User.findById(req.auth.id).then(function(user){
//     if(!user){ return res.sendStatus(401); }

//     return res.json({user: user.toAuthJSON()});
//   }).catch(next);
// });

// router.post('/users/login', function(req, res, next){
//   if(!req.body.user.username){
//     return res.status(422).json({errors: {username: "can't be blank"}});
//   }

//   if(!req.body.user.password){
//     return res.status(422).json({errors: {password: "can't be blank"}});
//   }

//   passport.authenticate('local', {session: false}, function(err, user, info){
//     if(err){ return next(err); }

//     //console.log(user);
//     if(user){
//       user.token = user.generateJWT();
//       return res.json({user: user.toAuthJSON()});
//     } else {
//       return res.status(422).json(info);
//     }
//   })(req, res, next);
// });

// router.post('/users', function(req, res, next){
//   var user = new User();

//   user.username = req.body.user.username;
//   user.email = req.body.user.email;
//   user.image = req.body.user.image;
//   //user.password = req.body.user.password;
//   user.setPassword(req.body.user.password);
//   if (req.body.user.password != req.body.user.password2) {
//     return res.status(422).json({errors: {passwords: "aren't the same"}});
//   }
  
//   user.save().then(function(){
//     return res.json({user: user.toAuthJSON()});
//   }).catch(next)
// });

// router.put('/user', auth.required, function(req, res, next){
//   User.findById(req.auth.id).then(function(user){
//     if(!user){ return res.sendStatus(401); }

//     if(req.body.user.username !== ''){
//       user.username = req.body.user.username;
//     }
//     if(req.body.user.email !== ''){
//       user.email = req.body.user.email;
//     }
//     if(req.body.user.bio !== ''){
//       user.bio = req.body.user.bio;
//     }
//     if(req.body.user.image !== ''){
//       user.image = req.body.user.image;
//     }
//     if(req.body.user.password !== ''){
//       console.log(req.body.user.password)
//       user.setPassword(req.body.user.password);
//     }

//     return user.save().then(function(){
//       return res.json({user: user.toAuthJSON()});
//     });
//   }).catch(next);
// });

// module.exports = router;