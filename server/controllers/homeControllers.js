function homeGET(req,res) {
    res.json(res.locals.redirect);
}

module.exports = {
    homeGET
}