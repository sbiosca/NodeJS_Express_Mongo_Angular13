const mongoose = require('mongoose');
const { schema } = require('../models/User.model');
const User = mongoose.model('User', schema);

exports.load_user = async (req, res, next, username) => {
    User.findOne({ username: username }).then(function (user) {
        if (!user) { return res.sendStatus(404); }

        req.profile = user;

        return next();
    }).catch(next);
}

exports.get_username = async (req, res, next) => {
    if(req.profile){
        User.findById(req.profile.id).then(function (user) {
            if (!user) { return res.json({ profile: req.profile.toProfileJSONFor(false) }); }

            return res.json({ profile: req.profile.toProfileJSONFor(user) });
        });
    } else {
        return res.json({ profile: req.profile.toProfileJSONFor(false) });
    }
}

exports.follow_user = async (req, res, next) => {
    var profile_id = req.profile._id;
    //console.log(req.profile.username)
    User.findById(req.auth.id)
        .then(function (user) {
            if (!user) {
                return res.sendStatus(401);
            }
            return user.follow(profile_id, req.profile).then(function () {
                return res.json(req.profile.toProfileJSONFor(user));
            });
        })
        .catch(next)
}

exports.delete_follow = async (req, res, next) => {
    var profileId = req.profile._id;
    User.findById(req.auth.id)
        .then(function (user) {
            if (!user) {
                return res.sendStatus(401);
            }
            return user.unfollow(profileId, req.profile).then(function () {
                return res.json(req.profile.toProfileJSONFor(user));
            });
        })
        .catch(next);
}