// Authentication //

// Import JSON web token //
const jwt = require('jsonwebtoken');

// Export middleware //
module.exports = (req, res, next) => {
    try {
        //Token is sent as an authorization header //
        // Split header to only retrive the second element in the array //
        const token = req.headers.authorization.split(' ')[1];
        // Decode the token using verify function //
        // Takes two arguments, the token that needs to be verified and the string used to encode it //
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        // Extract the userId from the decoded token //
        const userId = decodedToken.userId;
        // Short hand for userId: userId //
        req.auth = { userId };
        // Check userId if it is in our request body //
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid userID';
        } else {
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};
