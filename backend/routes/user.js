// User routes //

// Import express and Router //
const express = require('express');
const router = express.Router();

// Import User controller //
const userCtrl = require('../controllers/user');

// Frontend expects POST request as we are sending user information //
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

// Export the router //
module.exports = router;