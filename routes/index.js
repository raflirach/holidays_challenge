const router = require('express').Router()

const customers = require('./customers')

router.get('/', (req,res)=> {
    res.render('home')
})

router.use('/customers', customers)

module.exports = router