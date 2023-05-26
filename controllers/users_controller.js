const User = require('../models/user');
const fs = require('fs');
const path = require('path');


module.exports.profile = function (req, res) {
    res.end('<h1> User profile </h1>');
    User.findById(req.params.id, function (err, user) {
        return res.render('user_profile', {
            title: "User Profile",
            // user: user
            profile_user: user
        });
    });
  
}

// render the sign up page
module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/user_profile');
    }


    return res.render('user_sign_up', {
        title: "NodeAuthentication | sign Up"
    })
}


// render the sign in page
module.exports.signIn = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_in', {
        title: "NodeAuthentication | sign In"
    })
}


//get the sign up data

module.exports.create = function (req, res) {
    // console.log(req.body);
    if (req.body.password != req.body.confirm_password) {
        //return res.redirect('back');
        return res.status(200).json({
            message: "password do not match"
        })
    }

    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            console.log('error in finding user in signing up');

            return res.status(200).json({
                message: "error in finding user",
                ERROR: err
            })
        }


        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) {
                    console.log('error in creating user while signing up');

                    return res.status(200).json({
                        message: "unable to create user"
                    })
                }

                return res.redirect('/users/sign-in');
                // return res.status(200).json({
                //     message: "user created successfully"
                // })
            })
        } else {
            // return res.redirect('back');
            return res.status(200).json({
                message: "user already exist"
            })
        }

    });
}


module.exports.createSession = function (req, res) {
    req.flash('success', 'logged in successfully');

    //STEPS TO AUTHENTICATES
    return res.redirect('/');
};

module.exports.destroySession = function (req, res) {
    req.logout(function (err) {
        if (err) { return next(err); }
        req.flash('success', 'You have logged out!');


        return res.redirect('/');
    });
};