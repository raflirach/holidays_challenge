const Controller = require('../controllers/customerController')

const router = require('express').Router()

router.get('/', Controller.showList)

router.route('/register')
    .get(Controller.showFormRegister)
    .post(Controller.register)

router.route('/:idCustomer/editProfile')
    .get(Controller.showFormEdit)
    .post(Controller.edit)


router.route('/:idCustomer/accounts')
    .get(Controller.showAccounts)
    .post(Controller.addAccount)

router.route('/:idCustomer/accounts/:idAccount/transfer')
    .get(Controller.showTransferForm)
    .post(Controller.transfer)

module.exports = router