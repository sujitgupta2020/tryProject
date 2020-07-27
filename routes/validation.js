//Validation
const Joi = require('@hapi/joi');

//Register Validation
const registerValidation=(data)=>{
    
    const schema=Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password:Joi.string().min(6).required()
    });
    return schema.validate(data); //data = req.body
};

//Register Validation
const loginValidation=(data)=>{
    
    const schema=Joi.object({
        email: Joi.string().min(6).required().email(),
        password:Joi.string().min(6).required()
    });
    return schema.validate(data); //data = req.body
};


module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
