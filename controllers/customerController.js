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
}

module.exports = Controller