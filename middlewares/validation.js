const {check} = require('express-validator')

const registerValidator = [
    check('email', `Email field can't be empty`).not().isEmpty(),
    check('email', `Please, write correct email adress`).isEmail(),
    check('username', `Username field can't be empty`).not().isEmpty(),
    check('password', "Password field can't be empty").not().isEmpty(),
    check('password', "Password should have at leats length 6").isLength({min: 5, max: 30})
]


module.exports = {
    registerValidator,
    
};