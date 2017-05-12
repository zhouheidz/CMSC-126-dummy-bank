const express = require('express');
const User = require('../models.js').User;
const passport = require('passport');

const router = new express.Router();

router.get('/auth/github', passport.authenticate('github', { scope: ['user:email']}));

router.get('/auth/github/callback',
    passport.authenticate('github', {
        failureRedirect: '/'
    }),
    function(req, res) {
        req.session.currentUser = req.user.email;
        res.redirect('/profile');
    });

module.exports = router;
