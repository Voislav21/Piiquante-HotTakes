// Sauces related bussiness mogic //

// Import sauce model //
const Sauce = require('../models/sauces');
// Node file system package //
const fs = require('fs');

// Create function //
exports.createSauce = (req, res, next) => {
    // Get the requests protocol and host name //
    const url = req.protocol + '://' + req.get('host');
    // Create a sauceObject variable from the request body //
    const sauceObject = JSON.parse(req.body.sauce);
    // Create a new Sauce object //
    const sauce = new Sauce({
        // Use the spread operator to pass an object inside of another object //
        ...sauceObject,
        imageUrl: url + '/images/' + req.file.filename,
    });
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

// Retirve only one sauce //
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

// Deleting a sauce //
exports.deleteSauce = (req, res, next) => {
    // Find the id in the request params //
    Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
        // Returns a promise to extract the filename of the imageUrl //
        const filename = sauce.imageUrl.split('/images/')[1];
        // Unlink the image form IDE & database //
        fs.unlink('images/' + filename, () => {
            // Delete the sauce //
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

// Modifying a sauce //
exports.modifySauce = (req, res, next) => {
    // Create a reassignable variable //
    let sauce = new Sauce({ _id: req.params.id });
    // If a file has been uploaded //
    if (req.file) {
        // Find the id in the request params //
        Sauce.findOne({_id: req.params.id})
        .then((sauce) => {
            // Returns a promise to extract the filename of the imageUrl //
            const filename = sauce.imageUrl.split('/images')[1];
            // Unlink the original image form IDE & database //
            fs.unlink('images/' + filename, (error) => {
                if (error) {
                    console.error('Nope try again', error);
                }
            });
        });
        // Get the requests protocol and host name //
        const url = req.protocol + '://' + req.get('host');
        // Create a sauceObject from the request body //
        const sauceObject = JSON.parse(req.body.sauce);
        sauce = {
            // Use the spread operator to pass an object inside of another object //
            ...sauceObject,
            // Add the new image to the sauce object //
            imageUrl: url + '/images/' + req.file.filename
        };
    // If no file was uploaded during modifacation //
    } else {
        sauce = req.body;
    }
    // Update Sauce //
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

// Retrives all sauces //
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