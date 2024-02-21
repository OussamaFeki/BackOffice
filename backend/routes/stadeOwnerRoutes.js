// routes/stadeOwnerRoutes.js
const express = require('express');
const router = express.Router();
const stadeOwnerController = require('../controllers/Stade_Ownercontroller');

// Stade Owner actions
router.post('/stadeOwner/createStade', stadeOwnerController.createStade);
router.post('/stadeOwner/addStade', stadeOwnerController.addStade);
// router.post('/stadeOwner/createAndAddStade', stadeOwnerController.createAndAddStade);
router.post('/stadeOwner/addStadeOwner', stadeOwnerController.addStadeOwner);

module.exports = router;

