// Sauces routes //

// Import express and router //
const express = require('express');
const router = express.Router();

// Import middleware //
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// Import sauce controllers //
const sauceCtrl = require('../controllers/sauces');

// Send requests //
router.get('/', auth, sauceCtrl.getAllSauces);
router.post('/', auth, multer, sauceCtrl.createSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);

// Export module //
module.exports = router;