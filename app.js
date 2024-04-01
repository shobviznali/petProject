const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const userRoutes = require('./routes/userRoutes')
const portfolioRouter = require('./routes/portfolioRoutes')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')


app.use(bodyParser.json());
app.use('/auth', userRoutes)
app.use('', portfolioRouter)
app.use(express.json());
app.use(express.urlencoded({extended: true}));


const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://Ashot:21d1addc73@cluster0.jypo7up.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        app.listen(PORT, () => {
            console.log(`Server run at ${PORT} port`)
        });  
    }
    catch(e){
        console.log(e)
    }
}  


start()