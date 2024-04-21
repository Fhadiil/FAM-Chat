function redirectRoute(req, res) {
    res.json(res.locals.redirect);
}

function home(req, res) {
    res.locals.redirect = {
        route: '/',
        token: res.locals.token || null,
        user: user,
        error: null
    }
    next()
}
module.exports = {
    redirectRoute,
    home
}