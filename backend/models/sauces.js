// Sauces model //

// Import mongoose //
const mongoose = require('mongoose');

// create sauce schema //
const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    usersLiked: { type: Array, default: []},
    usersDisliked: { type: Array, default: [] }
});

// Create model, call model function, name the function Sauce //
module.exports = mongoose.model('Sauce', sauceSchema);