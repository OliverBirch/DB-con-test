const Sequelize = require('sequelize')
const db = require('../config/database')

const Company = db.define('ksc_student', {
    first_name: {
        type: Sequelize.STRING(255)
    }, 
    last_name: {
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
    email: {
        type: Sequelize.STRING(255)
    }, 
    phone: {
        type: Sequelize.STRING(255)
    },
    mobile: {
        type: Sequelize.STRING(255)
    },
    cpr: {
        type: Sequelize.STRING(255)
    },
    created_at: {
        type: Sequelize.DATE
    }, 
    updated_at: {
        type: Sequelize.DATE
    }, 
    comment: {
        type: Sequelize.TEXT
    }, 
    company_name: {
        type: Sequelize.STRING(255)
    },
    own_pc: {
        type: Sequelize.INTEGER(11)
    },
    company_street: {
        type: Sequelize.STRING(255)
    },
    company_post_code: {
        type: Sequelize.INTEGER(11)
    },
    company_city: {
        type: Sequelize.STRING(255)
    },
    company_id: {
        type: Sequelize.INTEGER(11)
    },
}, {
    tableName: 'ksc_students'
})

module.exports = Company