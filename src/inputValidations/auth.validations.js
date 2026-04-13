const Joi = require("joi");

const register = Joi.object({
    userName: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

const login = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

const logout = Joi.object({
    id: Joi.string().required()
});

module.exports = {
    register,
    login,
    logout
}