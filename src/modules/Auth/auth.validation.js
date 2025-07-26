import Joi from "joi";

export const registerValidation = {
  body: Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  })
};

export const loginValidation = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  })
};

export const forgotPasswordValidation = {
  body: Joi.object({
    email: Joi.string().email().required()
  })
};

export const resetPasswordValidation = {
  body: Joi.object({
    email: Joi.string().email().required(),
    otp: Joi.string().length(6).required(),
    newPassword: Joi.string().min(6).required()
  })
};
