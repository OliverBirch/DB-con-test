const woo = require('../config/woocommerceapi');
const { body } = require('express-validator');


module.exports = {
    importStudentByOrderId(id) {
        woo.get('orders/'+id)
            .then((res) => {
                return res
            })
            .catch((err) => {
                err.res
            })
    },
    validateStudent(req, res, next) {
        /*body('first_name').customSanitizer(value => {
            return value.charAt(0).toUpperCase() + value.slice(1)
        }).trim().exists()
        body('last_name').customSanitizer(value => {
            return value.charAt(0).toUpperCase() + value.slice(1)
        }).trim().exists()*/
        body('post_code').isPostalCode().exists()
        next()
        /*body('city').customSanitizer(value => {
            return value.charAt(0).toUpperCase() + value.slice(1)
        }).trim().exists()
        body('phone').isMobilePhone().trim().exists()
        body('email').normalizeEmail().isEmail().trim().exists()
        body('eanno').isEAN().optional()
        body('comment').trim().optional()
        body('cvr').isNumeric().trim() //skal være .optional, hvis EAN er udfyldt
        if (body('eanno').notEmpty()) {
            body('cvr').optional()
            next()
        } else {
            body('cvr').exists()
            next()*/
        
    },
}

