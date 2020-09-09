const Student = require('../models/student');

function findOrCreateStudent(req) {
  // if own_pc checkbox is checked, set it's value to 1.
  if (req.body.own_pc) {
    req.body.own_pc = 1
  } else {
    req.body.own_pc = 0
  }
  return Student.findOrCreate({
    where: {
      first_name: req.body.first_name,
      last_name: req.body.last_name
    },
    defaults: {
      street: req.body.adress,
      post_code: req.body.post_code,
      city: req.body.city,
      email: req.body.email,
      phone: req.body.phone,
      own_pc: req.body.own_pc,
      comment: req.body.comment,
      company_street: req.body.company_street,
      company_post_code: req.body.company_post_code,
      company_city: req.body.company_city
    }
  })
}

exports.findOrCreateStudent = findOrCreateStudent;
