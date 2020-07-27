const router =require('express').Router();
const User = require('../model/User');
const {registerValidation,loginValidation}= require('./validation');
//const {loginValidation}= require('./validation');//Added above
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
/*No more needed--added to validation file
//Validation
const Joi = require('@hapi/joi');

const schema=Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password:Joi.string().min(6).required()
});

*/
router.post('/register',async (req,res)=>{
    //Lets VALIDATE THE DATA BEFORE THE USER
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    //Check if the user is already in the database
    const emailExist = await User.findOne({email:req.body.email});
    if(emailExist) return res.status(400).send('Email Already exist');

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);

    //res.send('Register');
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword//changed to hashedPassword from req.body.password
    });
    try{
        const savedUser =await user.save();
        //res.send(savedUser);//Not sending whole information of user , sedning only id 
        res.send({user:user._id});
    }catch(err){
        res.status(400).send(err)
    }
})
router.post('/login',async (req,res)=>{
    //res.send('Login');
    //Lets VALIDATE THE DATA BEFORE THE USER
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    //Check if the email is not in database
    const user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send('Email is not Registered,Kindly Register');
    //Check if the password is correct
    const validPass= await bcrypt.compare(req.body.password , user.password);
    if(!validPass) return res.status(400).send('Password is Incorrect');

    //Create and assign a token jwt token
    const token =jwt.sign({_is: user._id}, process.env.TOKEN_SECRET,{expiresIn:'35s'});
    res.header('auth_token',token);
    //res.send(token);
    //Otherwise Logged In Successfull
    res.send('Logged In Successfull');
})

module.exports = router;
