const Controller = require('../controllers/customerController')

const router = require('express').Router()

router.get('/', Controller.showList)

router.route('/register')
    .get(Controller.showFormRegister)
    .post(Controller.register)


module.exports = router