const Joi = require("joi");

const updateUser = Joi.object({
  id: Joi.string().required(),
  userName: Joi.string().min(3).max(30).optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).optional()
});

module.exports = {
  updateUser,
};