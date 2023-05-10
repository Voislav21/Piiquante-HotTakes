// Sauces related bussiness mogic //

// Import sauce model //
const Sauce = require('../models/sauces');
// Node file system package //
const fs = require('fs');

// Create function //
exports.createSauce = (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    req.body.sauce = JSON.parse(req.body.sauce);
    const sauce = new Sauce({
        userId: req.body.sauce.userId,
        manufacturer: req.body.sauce.manufacturer,
        description: req.body.sauce.description,
        mainPepper: req.body.sauce.mainPepper,
        imageUrl: url + '/images/' + req.file.filename,
        heat: req.body.sauce.heat,
        likes: req.body.sauce.likes,
        dislikes: req.body.sauce.dislikes
    });
    sauce.save()
    .then(() => {
        res.status(201).json({
            message: 'Post saved successfully!'
        });
    }).catch((error) => {
        res.status(400).json({
            error: error
        });
    });
};