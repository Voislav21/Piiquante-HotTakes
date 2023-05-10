// User model //

// Import mongoose //
const mongoose = require('mongoose');
// Import unique validator //
const uniqueValidator = require('mongoose-unique-validator');

// Create user schema //
const userSchema = mongoose.Schema({
    // pass javascript object with the fields for the user //
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true}
});

// Call it as a plug-in //
userSchema.pluging(uniqueValidator);

// Create model, call model function, name the function 'User' //
module.exports = mongoose.model('User', userSchema);