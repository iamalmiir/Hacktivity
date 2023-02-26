import * as Joi from 'joi'

// Define Joi schema for user registration
export const registerValidator = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(8).required(),
})

export const userUpdateValidator = Joi.object({
  name: Joi.string(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
  username: Joi.string().alphanum().min(3).max(30),
  password: Joi.string().min(8),
})

// Define Joi schema for user login
export const loginValidator = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: Joi.string().min(8).required(),
})

// Define Joi schema for user profile
export const profileValidator = Joi.object({
  bio: Joi.string().min(5),
})
