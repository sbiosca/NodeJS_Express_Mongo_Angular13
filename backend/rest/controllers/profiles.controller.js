const mongoose = require('mongoose');
const { schema } = require('../models/User.model');
const User = mongoose.model('User', schema);

exports.load_user = async (req, res, next, username) => {
    console.log("param profile")
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
        console.log("params profile")
        return res.json({ profile: req.profile.toProfileJSONFor(false) });
    }
}

exports.follow_user = async (req, res, next) => {
    const profileId = req.profile._id;
    User.findById(req.payload.id).then(function (user) {
        if (!user) { return res.sendStatus(401); }

        return user.follow(profileId).then(function () {
            return res.json({ profile: req.profile.toProfileJSONFor(user) });
        });
    }).catch(next);
}

exports.delete_follow = async (req, res, next) => {
    const profileId = req.profile._id;
    User.findById(req.payload.id).then(function (user) {
        if (!user) { return res.sendStatus(401); }

        return user.unfollow(profileId).then(function () {
            return res.json({ profile: req.profile.toProfileJSONFor(user) });
        });
    }).catch(next);
}

