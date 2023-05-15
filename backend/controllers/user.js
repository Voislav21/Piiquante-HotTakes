// User related bussiness logic //

// Import bcrypt //
const bcrypt = require('bcrypt');
// Import JSON web token //
const jwt = require('jsonwebtoken');
// Import user model //
const User = require('../models/user');

// Sign up function //
exports.signup = (req, res, next) => {
    // Call hash function to hash the password //
    bcrypt.hash(req.body.password, 10)
    // Returns promise which receives the hash //
    .then((hash) => {
        // Create new user using our user model //
        const user = new User({
            email: req.body.email,
            password: hash
        });
        // Save this to the database //
        user.save()
        .then(() => {
            res.status(201).json({ message: 'User added successfully!' });
        }).catch((error) => {
            res.status(401).json({ error: error });
        });
    });
};

// Login function //
exports.login = (req, res, next) => {
    // Check if user exists by looking in the database //
    // Input matching an email in the request.body //
    User.findOne({ email: req.body.email })
    // Returns a promise containing the user //
    .then((user) => {
        // Chack if we dont get a user back from the database //
        if(!user) {
            // 401 status, authentication error //
            return res.status(401).json({
                error: new Error('User not found')
            });
        }
        // If user exists compare the entered password with the hash in the database //
        bcrypt.compare(req.body.password, user.password)
        // Returns a promise the receives whether it is valid //
        .then((valid) => {
            // Check if it is not valid //
            if (!valid) {
                // 401 status, authentication error //
                return res.status(401).json({
                    error: new Error('Incorrect password!')
                });
            }
            // Create token varible to encode our data using the sign method which takes two arguments //
            const token = jwt.sign(
                { userId: user._id },
                // Development string //
                'RANDOM_TOKEN_SECRET',
                // Configuration object //
                { expiresIn: '24h' });
            // Successfully found user with valid password //
            res.status(200).json({
                // Send back to frontend that expects a json object with two fields //
                userId: user._id,
                token: token
            });
        })
        .catch((error) => {
            res.status(500).json({ error: error });
        });
    })
    .catch((error) => {
        res.status(500).json({ error: error });
    });
};