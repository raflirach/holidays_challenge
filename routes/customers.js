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


module.exports = router