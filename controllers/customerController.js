const { Customer, Account } = require('../models')

const formatDate = require('../helpers/formatDate')

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

    static showFormEdit(req,res){
        const { idCustomer } = req.params
        Customer.findByPk(idCustomer)
        .then(data => res.render('formEdit', {data,formatDate}))
        .catch(e => res.send(e))
    }

    static edit(req,res){
        const { idCustomer } = req.params
        const input = {
            identityNumber: req.body.identityNumber ? req.body.identityNumber : null,
            fullName: req.body.fullName ? req.body.fullName : null,
            address: req.body.address ? req.body.address : null,
            birthDate: req.body.birthDate ? req.body.birthDate : null,
            gender: req.body.gender ? req.body.gender : null,
        }
        Customer.update(input, {where:{id:idCustomer}})
        .then( _=> res.redirect('/customers') )
        .catch(e => res.send(e))
    }

    static showAccounts(req,res){
        const { idCustomer } = req.params
        Customer.findOne({
            where:{id: idCustomer},
            include: [Account]
        })
        .then(data => res.render('accounts', {data}))
        .catch(e => res.send(e))
    }

    static addAccount(req,res){
        const {idCustomer} = req.params
        const input = {
            type: req.body.type ? req.body.type : null,
            balance: req.body.balance ? req.body.balance : null,
            CustomerId: idCustomer
        }
        Account.create(input)
        .then( _=> res.redirect(`/customers/${idCustomer}/accounts`))
        .catch(e => res.send(e))
    }
}

module.exports = Controller