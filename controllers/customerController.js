const { Customer } = require('../models')

class Controller {
    static showList(req,res){
       Customer.findAll({
           order : [['fullName']]
       })
       .then(data => {
           res.render('customers', {data})
       }) 
       .catch(e => res.send(e))
    }

    static showFormRegister(req,res){
        res.render('formRegister')
    }

    static register(req,res){
        const input = {
            identityNumber: req.body.identityNumber ? req.body.identityNumber : null,
            fullName: req.body.fullName ? req.body.fullName : null,
            address: req.body.address ? req.body.address : null,
            birthDate: req.body.birthDate ? req.body.birthDate : null,
            gender: req.body.gender ? req.body.gender : null,
        }
        Customer.create(input)
        .then( _=> res.redirect('/customers'))
        .catch(e => res.send(e))
    }
}

module.exports = Controller