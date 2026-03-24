const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller');
const { authenticate, isActiveUser } = require('../middleware/authMiddleware');

// ==========================================
// ALL ROUTES REQUIRE AUTHENTICATION
// ==========================================

// Profile routes
router.get('/profile', authenticate, userController.getMyProfile);
router.put('/profile', authenticate, userController.updateMyProfile);
router.put('/change-password', authenticate, userController.changePassword);
router.delete('/account', authenticate, userController.deleteMyAccount);

// Property-related routes
router.get('/my-properties', authenticate, userController.getMyProperties);

// Shortlist routes (requires active status)
router.get('/shortlist', authenticate, isActiveUser, userController.getMyShortlist);
router.post('/shortlist/:propertyId', authenticate, isActiveUser, userController.addToShortlist);
router.delete('/shortlist/:propertyId', authenticate, isActiveUser, userController.removeFromShortlist);

// Subscription
router.get('/subscription', authenticate, userController.getMySubscription);

module.exports = router;
