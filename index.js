const express= require('express')
const app = express();
const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config();
//Connect To DB
mongoose.connect(
process.env.DB_CONNECT,
{useNewUrlParser:true},
()=>console.log('connected to db')
);
//Import Routes
const authRoute= require('./routes/auth');
const homeRoute= require('./routes/home');

//Middleware
app.use(express.json());

//Route middleware---//My API on URL Header
app.use('/api/user',authRoute);
app.use('/api/home',homeRoute);

app.listen(3000,()=>{
    console.log('Server Got started')
})
