// Sauces related bussiness mogic //

// Import sauce model //
const Sauce = require('../models/sauces');
// Node file system package //
const fs = require('fs');

// Create function //
exports.createSauce = (req, res, next) => {
    // Get the requests protocol and host name //
    const url = req.protocol + '://' + req.get('host');
    // Create a sauceObject from the request body //
    const sauceObject = JSON.parse(req.body.sauce);
    // Create a new Sauce object //
    const sauce = new Sauce({
        // Use the spread operator to pass an object inside of another object //
        ...sauceObject,
        imageUrl: url + '/images/' + req.file.filename,
    });
    console.log(sauce);
    // Save the sauce //
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

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
        res.status(200).json(sauce);
    }).catch((error) => {
        res.status(400).json({
            error: error
        });
    });
};

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink('images/' + filename, () => {
            Sauce.deleteOne({ _id: req.params.id })
            .then(() => {
                res.status(200).json({
                    message: 'Deleted!'
                });
            }).catch((error) => {
                res.status(400).json({
                    error: error
                });
            });
        });
    });
};

exports.modifySauce = (req, res, next) => {
    let sauce = new Sauce({ _id: req.params._id });
    if (req.file) {
        const url = req.protocol + '://' + req.get('host');
        const sauceObject = JSON.parse(req.body.sauce);
        sauce = {
            ...sauceObject,
            imageUrl: url + '/images/' + req.file.filename
        };
    } else {
        sauce = req.body;
    }
    Sauce.updateOne({ _id: req.params.id }, sauce)
    .then(() => {
        res.status(201).json({
            message: 'Sauce updated successfully!'
        });
    }).catch((error) => {
        res.status(400).json({
            error: error
        });
    });
};

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
    .then((sauces) => {
        res.status(200).json(sauces);
    }).catch((error) => {
        res.status(400).json({
            error: error
        });
    });
};