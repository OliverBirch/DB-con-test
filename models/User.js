const Sequelize = require('sequelize')
const bcrypt = require('bcrypt')
const db = require('../config/database')

const User = db.define('ksc_user', {
    name: {
        type: Sequelize.STRING(255)
    }, 
    email: {
        type: Sequelize.STRING(255)
    },  
    password: {
        type: Sequelize.STRING(255)
    }, 
    created_at: {
        type: Sequelize.DATE
    }, 
    updated_at: {
        type: Sequelize.DATE
    }, 
}, {
    tableName: 'ksc_users'
})

User.addHook('beforeCreate', function(user, fn) {
    const salt = bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        return salt
    })
    bcrypt.hash(user.password, salt, null, (err, hash) => {
        if (err) return next(err)
        user.password = hash
        return fn(null, user)
    })
})

module.exports = User