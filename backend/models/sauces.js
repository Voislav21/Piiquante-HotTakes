// Sauces model //

// Import mongoose //
const mongoose = require('mongoose');

// create sauce schema //
const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, require: true },
    manufacturer: { type: String, require: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, require: true },
    heat: { type: Number, require: true },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 }
});

// Create model, call model function, name the function Sauce //
module.exports = mongoose.model('Sauce', sauceSchema);