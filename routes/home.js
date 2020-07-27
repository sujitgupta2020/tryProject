const router =require('express').Router();
const verify = require('./verifyToken')

router.get('/',verify,(req,res)=>{
    res.json({
        posta:{
            title:'my first post',
            description:'Landing Page'
        },user:req.user
    })
})

router.post('/upload',verify,(req,res)=>{
    const imagInArray = req.body.image;
    res.json({
        posta:{
            title:'my first post',
            description:'Landing Page'
        },user:req.user
    })
})

module.exports= router;