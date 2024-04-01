const express = require('express')
const multer = require('multer')
const multRouter = express.Router()

const storage = multer.diskStorage({destination : (req, file, cb) => {
    cb(null, 'uploads/')
}, filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
}})

const upload = multer({storage: storage})

multRouter.post('/upload', upload.single('file'), (req, res) => {
    res.send("File uploaded")
})

module.exports = multRouter;