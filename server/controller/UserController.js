const User = require("../model/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// import validator function from validator file
const { validateRegister, validateLogin } = require("../config/validator");

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
            { user_id: user._id, email, type: user.user_type },
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
        res.send(error.message);
    }
}

// Login
async function login(req, res) {
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            res.status(400).send("Input required");
        }

        // Validate using Joi
        const { value, error } = validateLogin(req.body);
        if (error) {
            return res.json(error.details);
        }

        // Validate if user exists in our database
        const user = await User.findOne({ email });

        // IF everything is okay => create token
        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
                { user_id: user._id, email, type: user.user_type },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );

            // save user token
            user.token = token;

            // user
            res.header("auth-token", token);
            res.status(200).json({ status: "successfully logged in", user });
        }
        res.status(400).send("Invalid Credentials");
    } catch (error) {
        console.log(error.message);
        res.send(error.message);
    }
}

module.exports = { register, login };
