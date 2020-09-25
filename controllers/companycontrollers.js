const Company = require('../models/Company');

module.exports = {
    findOrCreateCompany(company) {
        return Company.findOrCreate({
            where: {
                name: company.name
            },
            defaults: {
                street: company.address,
                post_code: company.postcode,
                city: company.city,
                contact: company.contact,
                phone: company.phone,
                email: company.email,
                eanno: company.eanno,
                comment: company.comment,
            }
        })
    },
    createCompanyFromApi(company) {
        return new Company({
            name: company.data.firmaoplysninger.firma_navn,
            street: company.data.firmaoplysninger.firma_adresse,
            post_code: company.data.firmaoplysninger.firma_postcode,
            city: company.data.firmaoplysninger.firma_by,
            contact: company.data.firmaoplysninger.firma_kontaktperson,
            phone: company.data.firmaoplysninger.firma_phone,
            email: company.data.firmaoplysninger.firma_email,
            eanno: company.data.firmaoplysninger.firma_ean,
            comment: '',
            cvr: company.data.firmaoplysninger.firma_cvr,
        })
    },    
    async updateCompany(oldCompany, newCompany) {
        oldCompany.name = newCompany.name
        oldCompany.street = newCompany.street
        oldCompany.post_code = newCompany.post_code
        oldCompany.city = newCompany.city
        oldCompany.contact = newCompany.contact
        oldCompany.email = newCompany.email
        oldCompany.phone = newCompany.phone
        oldCompany.comment = newCompany.comment
        oldCompany.eanno = newCompany.eanno
        oldCompany.cvr = newCompany.cvr
        try {
            await oldCompany.save()
        } catch(err) {
            if(err.message == 'Query was empty'){
                console.log('There is no changes in the update, lets continue the progress...');
                return oldCompany
            }
        }
        return oldCompany
    },
}
