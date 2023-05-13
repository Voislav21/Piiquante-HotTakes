// Sauces related bussiness logic //

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

// Like or dislike sauce //
exports.likesOrDislikes = (req, res, next) => {
    // Store userId and sauceId //
    const userId = req.body.userId;
    const sauceId = req.params.id;
    if (req.body.like === 1) {
        // Action to be taken if a user likes a sauce //
        const updateLike = {
            // Increment the value of likes by 1 //
            $inc: { likes: req.body.like },
            // Push the userId into the usersLiked array //
            $push: { usersLiked: userId }
        };
        // Update the sauce //
        Sauce.updateOne({ _id: sauceId }, updateLike)
        .then(() => {
            res.status(200).json({ message: 'Your like is greatly appreciated!'});
        })
        .catch((error) => {
            res.status(500).json({ error: error});
        });
    } else if (req.body.like === -1) {
        // Action to be taken if user dislikes a sauce //
        const updatDislike = {
            // Increment the value of dislikes by -1 //
            $inc: { dislikes: req.body.like },
            // Push the userId into the usersDisliked array //
            $push: { usersDisliked: userId }
        };
        // Update the sauce //
        Sauce.updateOne({ _id: sauceId }, updatDislike)
        .then(() => {
            res.status(200).json({ message: 'You duna likea my sauce?'});
        })
        .catch((error) => {
            res.status(500).json({ error: error});
        });
    } else if (req.body.like === 0) {
        // Action to be taken if user changes thier mind //
        const changeLike = {
            // Increments the value of likes by -1 //
            $inc: { likes: -1 },
            // Pull the userId from the array //
            $pull: { usersLiked: userId }
        };
        const changeDislike = {
            // Increments the value of dislikes by 1 //
            $inc: { dislikes: +1 },
            // Pull the userId from the array //
            $pull: { usersDisliked: userId }
        };
        Sauce.findOne({ _id: sauceId })
        // Find the sauce to pass it as an argument in the promise //
        .then((sauce) => {
            // If the userId is included in the array the user can unclick their like //
            if (sauce.usersLiked.includes(userId)) {
                // Update the sauce //
                Sauce.updateOne({ _id: sauceId }, changeLike)
                .then(() => {
                    res.status(200).json({ message: 'You like has been removed' });
                })
                .catch((error) => {
                    res.status(500).json({ error: error });
                });
                // If the userId is included in the array the user can unclick their dislike //
            } else if (sauce.usersDisliked.includes(userId)) {
                // Update the sauce //
                Sauce.updateOne({ _id: sauceId }, changeDislike)
                .then(() => {
                    res.status(200).json({ message: 'Your dislike has been removed' });
                })
                .catch((error) => {
                    res.status(500).json({ error: error });
                });
            } else {
                res.status(400).json({ error: 'Invalid like value!' });
            }
        })
        .catch((error) => {
            res.status(500).json({ error: error });
        });
    } else {
        res.status(400).json({ error: 'Invalid like value!' });
    }
};