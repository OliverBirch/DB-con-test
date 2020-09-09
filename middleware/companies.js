const Company = require('../models/company')

module.exports = {
    async getAllCompanies(req, res, next) {
        try {
            req.data = await Company.findAll({ order: [['updated_at', 'DESC']]})
            next()
        } catch (error) {
            console.error(error)
        }
    },
} 

