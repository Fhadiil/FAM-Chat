const passport = require('passport'),
    jwt = require('jsonwebtoken'),
    users = require('../models/users');


function generateToken(user) {
    if (user) {
        let signedToken = jwt.sign(
            {
                data: user._id,
                exp: new Date().setDate(new Date().getDate() + 1)
            },
            process.env.TOKEN_KEY
        );
        return signedToken;
    }
    return new Error('userException: user not found');
}


function getCreateAccount(req, res, next) {
    res.locals.redirect = {
        route: '/',
        token: null,
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
    const password = req.body.password1 || req.query.password
    users.register(newUser, password, (error, user) => {
        if (error || !user) {
            res.locals.redirect = {
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
                    error: 'An error occured: failed to login'
                }
                next();
            }
            if (!user) {
                console.error('login failed!', error)
                res.locals.redirect = {
                    route: '/error',
                    token: res.locals.token || null,
                    user: user,
                    error: 'Login failure'
                }
                next();
            }
            res.locals.token = generateToken(user);
            res.locals.redirect = {
                route: '/',
                token: res.locals.token || null,
                user: user,
                loggedIn: req.isAuthenticated(),
                message: 'USER SIGNED',
                error: null,
            }
            next();
        })
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
            console.error('User not found')
            res.locals.redirect = {
                route: '/error',
                token: res.locals.token || null,
                user: user,
                error: 'User not found'
            }
            next();
        }
        if (error) {
            console.error('authentication error')
            res.locals.redirect = {
                route: '/error',
                token: res.locals.token || null,
                user: user,
                error: 'Authentication error'
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
                    error: 'An error occured: failed to login'
                }
                next();
            }
            if (!user) {
                console.error('login failed!', error)
                res.locals.redirect = {
                    route: '/error',
                    token: res.locals.token || null,
                    user: user,
                    error: 'Login failure'
                }
                next();
            }
            res.locals.redirect = {
                route: '/',
                token: res.locals.token || null,
                user: user,
                loggedIn: req.isAuthenticated(),
                error: null,
            }
            next();
        })
    })(req, res, next)
}

function verifyToken(req, res, next) {
    const token = req.query.token || res.locals.redirect.token
    if (token) {
        jwt.verify(token, process.env.TOKEN_KEY, (error, payload) => {
            if (payload) {
                mod.user
                    .findById(payload.data).then(user => {
                        if (user) {
                            return next();
                        } else {
                            res.json({
                                error: true,
                                message: "No User account found."
                            })
                        }
                    })
            } else {
                res.json({
                    error: true,
                    message: "Cannot verify API token."
                });
                next();
            }
        })
    } else {
        res.json({
            error: true,
            message: "Provide Token"
        });
    }
}


module.exports = {
    getCreateAccount,
    createAccount,
    getLogin,
    login,
    verifyToken
}