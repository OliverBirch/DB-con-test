const { Sequelize, Model, Op, DataTypes } = require('sequelize')


module.exports = new Sequelize(
    process.env.DB, 
    process.env.DB_USER, 
    process.env.DB_PASS, 
    { 
      host: process.env.DB_HOST, 
      dialect: "mysql",
      storage: './database.sqlite',
      port: process.env.DB_PORT,
      define: {
        timestamps: false
      }
  })