const router = require('express').Router();
const profile = require('../../controllers/profiles.controller')
const auth = require('../auth');

router.param("username", profile.load_user);
router.get("/:username", auth.optional, profile.get_username);
router.post("/:username/follow", auth.required, profile.follow_user);
router.delete("/:username/follow", auth.required, profile.delete_follow);

module.exports = router;

// const mongoose = require('mongoose');
// const router = require('express').Router();
// const { schema } = require('../../models/User.model');
// const User = mongoose.model('User', schema);
// const auth = require('../auth');

// // Preload user profile on routes with ':username'
// router.param('username', function(req, res, next, username){
//     console.log("param profile")
//   User.findOne({username: username}).then(function(user){
//     if (!user) { return res.sendStatus(404); }

//     req.profile = user;

//     return next();
//   }).catch(next);
// });

// router.get('/:username', auth.optional, function(req, res, next){
//   if(req.profile){
//     User.findById(req.profile.id).then(function(user){
//       if(!user){ return res.json({profile: req.profile.toProfileJSONFor(false)}); }
      
//       return res.json({profile: req.profile.toProfileJSONFor(user)});
//     });
//   } else {
//     console.log("params profile")
//     return res.json({profile: req.profile.toProfileJSONFor(false)});
//   }
// });

// router.post('/:username/follow', auth.required, function(req, res, next){
//   const profileId = req.profile._id;

//   User.findById(req.payload.id).then(function(user){
//     if (!user) { return res.sendStatus(401); }

//     return user.follow(profileId).then(function(){
//       return res.json({profile: req.profile.toProfileJSONFor(user)});
//     });
//   }).catch(next);
// });

// router.delete('/:username/follow', auth.required, function(req, res, next){
//   const profileId = req.profile._id;

//   User.findById(req.payload.id).then(function(user){
//     if (!user) { return res.sendStatus(401); }

//     return user.unfollow(profileId).then(function(){
//       return res.json({profile: req.profile.toProfileJSONFor(user)});
//     });
//   }).catch(next);
// });
