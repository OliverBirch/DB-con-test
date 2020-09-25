const session = require('express-session')
const flash = require('express-flash')

function validateAndRedirect(wasCreated, req, res, path) {
    req.session.wascreated = wasCreated
    if (wasCreated == true) {
        req.flash('error', 'Tilføjet!')
        res.redirect(`${path}`)
    } else if (wasCreated == false) {
        res.redirect(`${path}`)
    } else {
        res.send('Noget gik galt...')
    }
}
exports.validateAndRedirect = validateAndRedirect;
