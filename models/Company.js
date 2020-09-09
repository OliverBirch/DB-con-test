const Sequelize = require('sequelize')
const db = require('../config/database')

const Company = db.define('ksc_company', {
    name: {
        type: Sequelize.STRING(255)
    }, 
    street: {
        type: Sequelize.STRING(255)
    }, 
    post_code: {
        type: Sequelize.INTEGER(11)
    }, 
    city: {
        type: Sequelize.STRING(255)
    }, 
    created_at: {
        type: Sequelize.DATE
    }, 
    updated_at: {
        type: Sequelize.DATE
    }, 
    contact: {
        type: Sequelize.STRING(255)
    }, 
    phone: {
        type: Sequelize.STRING(255)
    }, 
    email: {
        type: Sequelize.STRING(255)
    }, 
    eanno: {
        type: Sequelize.STRING(255)
    }, 
    comment: {
        type: Sequelize.TEXT
    }, 
}, {
    tableName: 'ksc_companies'
}, {
    setterMethods: {
        updateAllValues(req) {
            this.setDataValue('')
        }
    }
})

module.exports = Company