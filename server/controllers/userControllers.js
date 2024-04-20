const mongoose = require('mongoose'),
    passport = require('passport'),
    jwt = require('jsonwebtoken');
const users = require('../models/users');

function getCreateAccount(req, res, next) {
    res.locals.redirect = {
        route: '/',
        token: res.locals.token || null,
        user: null,
        error: null
    }
    next();
}


function createAccount(req, res, next) {
    const userDetails = {
        username: req.body.username || req.query.username
    }
    const newUser = new users(userDetails);
    const password = req.body.password || req.query.password
    users.register(newUser, password, (error, user) => {
        if (error || !user) {
            res.locals.error = {
                route: '/error',
                token: res.locals.token || null,
                user: user,
                error: error
            }
            next();
        }
        res.locals.redirect = {
            route: '/',
            token: res.locals.token || null,
            user: user,
            error: error || null
        }
        next();
    })

}


function getLogin(req, res, next) {
    res.locals.redirect = {
        route: 'users/login',
        token: res.locals.token || null,
        user: null,
        error: null
    }
    next();

}

function login(req, res, next) {
    passport.authenticate('local', (error, user) => {
        if (!user) {
            res.locals.error = {
                route: '/error',
                token: res.locals.token || null,
                user: user,
                error: error
            }
            next();
        }
        req.login(user, (error) => {
            if (error) {
                console.error('login failed!', error)
                res.locals.redirect = {
                    route: '/error',
                    token: res.locals.token || null,
                    user: user,
                    error: error
                }
                next();
            }
            if (!user) {
                console.error('login failed!', error)
                res.locals.redirect = {
                    route: '/error',
                    token: res.locals.token || null,
                    user: user,
                    error: error
                }
                next();
            }
            res.locals.redirect = {
                route: '/',
                token: res.locals.token || null,
                user: user,
                error: error
            }
            next();
        })
    })(req, res, next)
}


module.exports = {
    getCreateAccount,
    createAccount,
    getLogin,
    login
}