const Controller = require('../controllers/customerController')

const router = require('express').Router()

router.get('/', Controller.showList)


module.exports = router