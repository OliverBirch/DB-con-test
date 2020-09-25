function checkIfAuthenticated(req, res, next) {
/*    console.log(" is athenticated: " +req.isAuthenticated())
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')*/
    next()
}

module.exports = checkIfAuthenticated