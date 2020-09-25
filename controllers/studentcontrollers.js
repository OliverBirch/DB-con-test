const Student = require('../models/student')
const { capitalizeFirstLetter } = require('./general')

module.exports = {
  findOrCreateStudent(student) {
      // if own_pc checkbox is checked, set it's value to 1.
      if (student.own_pc) {
        student.own_pc = 1
      } else {
        student.own_pc = 0
      }

      return Student.findOrCreate({
        where: {
          first_name: student.first_name,
          last_name: student.last_name,
        },
        defaults: {
          street: capitalizeFirstLetter(student.adress),
          post_code: student.post_code,
          city: capitalizeFirstLetter(student.city),
          email: capitalizeFirstLetter(student.email),
          phone: student.phone,
          own_pc: student.own_pc,
          comment: capitalizeFirstLetter(student.comment),
          company_street: capitalizeFirstLetter(student.company_street),
          company_post_code: student.company_post_code,
          company_city: capitalizeFirstLetter(student.company_city)
        }
      })
  }, 
  async updateStudent(oldStudent, newStudent) {
    oldStudent.first_name = capitalizeFirstLetter(newStudent.first_name)
    oldStudent.street = capitalizeFirstLetter(newStudent.street)
    oldStudent.post_code = newStudent.post_code
    oldStudent.city = capitalizeFirstLetter(newStudent.city)
    oldStudent.email = capitalizeFirstLetter(newStudent.email)
    oldStudent.phone = newStudent.phone
    oldStudent.comment = capitalizeFirstLetter(newStudent.comment)
    oldStudent.company_name = capitalizeFirstLetter(newStudent.company_name)
    oldStudent.company_street = capitalizeFirstLetter(newStudent.company_street)
    oldStudent.own_pc = newStudent.own_pc
    oldStudent.company_post_code = newStudent.company_post_code
    oldStudent.company_city = capitalizeFirstLetter(newStudent.company_city)
    try {
      await oldStudent.save()
    } catch(err) {
      if(err.message == 'Query was empty'){
      console.log('There is no changes in the update, lets continue the progress...');
      return oldStudent
      }
    }
    return oldStudent
  },
  createStudentFromApi(student) {
    return new Student({
        first_name: capitalizeFirstLetter(student.data.kursist_status.kursist_navn),
        last_name: capitalizeFirstLetter(student.data.kursist_status.kursist_efternavn),
        street: capitalizeFirstLetter(student.data.kursist_status.kursist_adresse),
        post_code: student.data.kursist_status.kursist_post,
        city: capitalizeFirstLetter(student.data.kursist_status.kursist_by),
        email: capitalizeFirstLetter(student.data.kursist_status.kursist_email),
        phone: student.data.kursist_status.kursist_tlf,
        comment: capitalizeFirstLetter(student.data.kursist_status.kursist_comment),
        company_name: capitalizeFirstLetter(student.data.firmaoplysninger.firma_navn),
        own_pc: student.own_pc,
        company_street: capitalizeFirstLetter(student.data.firmaoplysninger.firma_adresse),
        company_post_code: student.data.firmaoplysninger.firma_postcode,
        company_city: capitalizeFirstLetter(student.data.firmaoplysninger.firma_by)
    })
  }
}