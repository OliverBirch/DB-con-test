const Company = require('../models/Company');
function findOrCreateCompany(req) {
	return Company.findOrCreate({
		where: {
			name: req.body.name
		},
		defaults: {
			street: req.body.address,
			post_code: req.body.postcode,
			city: req.body.city,
			contact: req.body.contact,
			phone: req.body.phone,
			email: req.body.email,
			eanno: req.body.eanno,
			comment: req.body.comment,
		}
	});
}
exports.findOrCreateCompany = findOrCreateCompany;
