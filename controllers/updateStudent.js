const Company = require('../models/Company');

async function updateStudent(oldStudent, req) {
    oldStudent.first_name = req.body.first_name
    oldStudent.last_name = req.body.last_name
    oldStudent.street = req.body.street
    oldStudent.post_code = req.body.post_code
    oldStudent.city = req.body.city
    oldStudent.email = req.body.email
    oldStudent.phone = req.body.phone
    oldStudent.comment = req.body.comment
    oldStudent.company_name = req.body.company_name
    oldStudent.company_street = req.body.company_street
    oldStudent.own_pc = req.body.own_pc
    oldStudent.company_post_code = req.company_post_code
    oldStudent.company_city = req.company_city
    await oldStudent.save()
    return oldStudent
}

exports.updateStudent = updateStudent;
