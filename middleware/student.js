const Student = require('../models/student')
const { Sequelize, DataTypes } = require('sequelize')
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
const db = require('../config/database')
const woo = require('../config/woocommerceapi');

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
    createStudentModelFromApi(student) {
      return new Student({
        first_name: student.data.kursist_status.kursist_navn,
        last_name: student.data.kursist_status.kursist_efternavn,
        street: student.data.kursist_status.kursist_adresse,
        post_code: student.data.kursist_status.kursist_post,
        city: student.data.kursist_status.kursist_by,
        email: student.data.kursist_status.kursist_email,
        phone: student.data.kursist_status.kursist_tlf,
        comment: student.data.kursist_status.kursist_comment,
        company_name: student.data.firmaoplysninger.firma_navn,
        own_pc: student.own_pc,
        company_street: student.data.firmaoplysninger.firma_adresse,
        company_post_code: student.data.firmaoplysninger.firma_postcode,
        company_city: student.data.firmaoplysninger.firma_by
      })
    }

}

