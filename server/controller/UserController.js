const User = require("../model/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// import validator function from validator file
const { validateRegister } = require("../config/validator");

// Register a new user

async function register(req, res) {
    try {
        // Get user input
        const {
            first_name,
            last_name,
            email,
            password,
            phone_number,
            date_of_birth,
            photo,
            location,
        } = req.body;

        // Validate using Joi
        const { value, error } = validateRegister(req.body);
        if (error) {
            return res.json(error.details);
        }

        // Validate if user already exists in database
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(409).send("User Already Exists. Please Login");
        }

        // Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in database
        const user = await User.create({
            first_name,
            last_name,
            date_of_birth,
            photo,
            phone_number,
            location,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
        });

        // Create token
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );

        // save user token
        user.token = token;

        // return new user
        res.status(201).json(user);
    } catch (error) {
        console.log(error.message);
        res.json(error.message);
    }
}

// Login

module.exports = { register };
