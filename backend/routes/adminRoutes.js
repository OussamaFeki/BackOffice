// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/Admincontroller');
const authenticateAdmin = require('../middlewares/authMiddleware'); // Assuming you have an authentication middleware

// Admin login
router.post('/admin/login', adminController.login);
// Create a new admin
router.post('/admin/createAdmin', adminController.createAdmin);

// Middleware to authenticate subsequent routes
router.use(authenticateAdmin);

// Admin actions for Stade_Owner
router.get('/admin/stadeOwners/pending', adminController.viewPendingRegistrations);
router.put('/admin/stadeOwners/approve', adminController.acceptRegistration);
router.delete('/admin/stadeOwners/approve',adminController.refuseRegistration);

// Admin actions for Stades
router.get('/admin/stades', adminController.viewAllStades);

// Admin actions for Packs
router.post('/admin/packs', adminController.createPack);
router.delete('/admin/packs/:packId', adminController.deletePack);
router.put('/admin/packs/:packId', adminController.editPack);

module.exports = router;
