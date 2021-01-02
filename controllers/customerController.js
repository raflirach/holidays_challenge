const { Customer, Account } = require('../models')

const formatDate = require('../helpers/formatDate')
const formatBalance = require('../helpers/formatBalance')
const { Op } = require("sequelize");


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
        let errors
        if(Object.keys(req.query)) errors = req.query
        res.render('formRegister', {errors})
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
        .catch(e => {
            let errors = e.errors.map(el => el.message)
            res.redirect(`/customers/register?${errors.join('&')}`)
        })
    }

    static showFormEdit(req,res){
        const { idCustomer } = req.params
        let errors
        if(Object.keys(req.query)) errors = req.query
        Customer.findByPk(idCustomer)
        .then(data => res.render('formEdit', {data,formatDate,errors}))
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
        Customer.findOne({
            where:{
                id:idCustomer,
                identityNumber: input.identityNumber
            }
        })
        .then(data => {
            if(data){
                delete input.identityNumber
                return Customer.update(input, {where:{id:idCustomer}})
            }else{
                return Customer.update(input, {where:{id:idCustomer}})
            }
        })
        .then( _=> res.redirect('/customers'))
        .catch(e => {
            let errors = e.errors.map(el => el.message)
            res.redirect(`/customers/${idCustomer}/editProfile?${errors.join('&')}`)
        })
    }

    static showAccounts(req,res){
        const { idCustomer } = req.params
        let errors
        if(Object.keys(req.query)) errors = req.query
        Customer.findOne({
            where:{id: idCustomer},
            include: [Account]
        })
        .then(data => res.render('accounts', {data,formatBalance,errors}))
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
        .catch(e => {
            let errors = e.errors.message
            res.redirect(`/customers/${idCustomer}/accounts?${errors}`)
        })
    }

    static showTransferForm(req,res){
        const {idCustomer,idAccount} = req.params
        let errors
        if(Object.keys(req.query)) errors = req.query
        let sender
        Account.findByPk(idAccount,{include:Customer})
        .then(data => {
            sender = data
            return Account.findAll({
                include:Customer,
                order:['accountNumber'],
                where:{
                    id: {
                        [Op.ne]:idAccount
                    }
                }
            })
        })
        .then(receiver => res.render('formTransfer',{receiver,sender,formatBalance,errors}))
        .catch(e => res.send(e))
    }

    static transfer(req,res){
        const {idCustomer,idAccount} = req.params
        const input = {
            amount: req.body.amount ? +req.body.amount : 0,
            receiverId : req.body.accountId
        }
        Account.findByPk(idAccount)
        .then(data => {
            return Account.update({
                balance: data.balance - input.amount
            },
            {where:{id:idAccount}, individualHooks: true})
        })
        .then( _=> Account.findByPk(input.receiverId))
        .then(data => {
            return Account.update({
                balance:data.balance + input.amount
            },
            {where:{id:input.receiverId}},
        )
        })
        .then(_=>res.redirect(`/customers/${idCustomer}/accounts`))
        .catch(e => {
            let errors = e.errors.message
            res.redirect(`/customers/${idCustomer}/accounts/${idAccount}/transfer?${errors}`)
        })
    }
}

module.exports = Controller