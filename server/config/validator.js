const Joi = require("joi");

// Validation function
function validateCredentials(schema) {
    return (payload) => schema.validate(payload, { abortEarly: false });
}

// Register Validation Schema (using JOI):
const registerSchema = Joi.object({
    first_name: Joi.string().min(3).max(30).required().alphanum(),
    last_name: Joi.string().min(3).max(30).required().alphanum(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    confirm_password: Joi.string().required().valid(Joi.ref("password")),
    photo: Joi.string().min(0),
    date_of_birth: Joi.date(),
    location: Joi.object().required(),
    phone_number: Joi.number().min(8).required(),
});

// Validate Register Credentials according to schema
const validateRegister = validateCredentials(registerSchema);

module.exports = { validateRegister };
