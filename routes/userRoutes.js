const express = require("express");
const router = express.Router();
const controller = require('../controllers/userController')
const { registerValidator } = require('../middlewares/validation')


router.post('/register', registerValidator, controller.register);

router.post('/login', controller.login);

router.get('/logout', controller.logout);

router.put('/resetPassword', controller.resetPassword)

router.get('/user/profile', (req, res) => {
    res.send("Your profile");
});

router.put('/user/profile', (req, res) => {
    res.send("Update profile");
});

router.delete('/user/profile', (req, res) => {
    res.send("Deleteing profile");
});

router.get('/user/list', (req, res) => {
    res.send("User profiles");
}); //should be only for admins

router.put('/user/:id/permissons', (req, res) => {
    res.send('Add or delete permissons of user');
}); //should be only for admins

module.exports = router;