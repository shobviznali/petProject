const User = require('../models/User')
const Role = require('../models/Role')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {secret} = require('../config')
const {validationResult} = require('express-validator')
const SALT = 10

const generateAccesToken = (id, roles) => {
    const payload = {
        id,
        roles
    }

    return jwt.sign(payload, secret, {expiresIn: '24h'})
}

class userController {
    async register(req, res) {
        try{
            console.log(req.body)
            const errors = validationResult(req)
            console.log(errors)
            if(!errors.isEmpty()){
                return res.status(400).json({message: "Something went wrong during registration", errors})
            }
            const {email, username, password} = req.body
            const candidate = await User.findOne({username})
            if(candidate) {
                return res.status(400).json("User with that username exists.")
            }
            const hashPassword = bcrypt.hashSync(password, SALT)
            const userRole = await Role.findOne({value: "USER"})
            const user = new User({email, username, password: hashPassword, roles: [userRole.value]})
            await user.save()
            res.json('Server work')
        }
        catch(error){
            console.log(error)
            res.status(500).json({message: "Internal server error"})

        }
    }

    async login(req, res) {
        try{
            const {username, password} = req.body
            const user = await User.findOne({username})
            if(!user){
                return res.status(401).json("User nor found")
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if(!validPassword){
                return res.status(401).json("Invalid password")
            }
            const token = generateAccesToken(user._id, user.roles)
            return res.json({token})
        }
        catch(error){
            console.log(error)
            res.status(500).json({message: "Internal server error"})

        }
    }

    async logout(req, res) {
        try{
            res.clearCookie('jwt')
            // localStorage.removeItem('jwt')
            return res.status(200).json({ message: "Logout successful" });
        }
        catch(error){
            console.log(error)
            res.status(500).json({message: "Internal server error"})

        }
    }

    async resetPassword(req, res) {
        try{
            const token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.verify(token, secret);

            if(!decodedToken){
                return res.status(400).json({message: "Error"})
            }
            const {username, password, new_password} = req.body
            const user = await User.findOne({username})
            const validPassword = bcrypt.compareSync(password, user.password)
            if(!validPassword){
                return res.status(401).json("Wrong password")
            }
            const filter = {username: username}
            const hashPassword = bcrypt.hashSync(new_password, SALT)
            const update = {$set: {password: hashPassword}}

            const result = await User.updateOne(filter, update);

            return res.status(200).json("Password changed")
        }
        catch(error){
            console.log(error)
            res.status(500).json({message: "Internal server error"})

        }
    }
}

module.exports = new userController()