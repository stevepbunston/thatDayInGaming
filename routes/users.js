const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const users = require('../controllers/users');
const { storeReturnTo, isProfileOwnerOrAdmin, ensureVerified, isAdmin} = require('../middleware');

router.route('/register')
    .get(users.renderRegisterForm)
    .post(catchAsync(users.createNewUser));

router.route('/login')
    .get(users.renderLoginForm)
    .post(storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), ensureVerified, users.userLogin);

router.get('/verify-email', catchAsync(users.verifyEmail));

router.post('/resend-verification', catchAsync(users.resendVerifyEmail));

router.get('/logout', users.userLogout);

router.get('/users', isAdmin, catchAsync(users.userIndex));

router.route('/users/:id')
    .get(isProfileOwnerOrAdmin, ensureVerified, catchAsync(users.userProfile))
    .put(isProfileOwnerOrAdmin, ensureVerified, catchAsync(users.updateUserProfile))
    .delete(isProfileOwnerOrAdmin, ensureVerified, catchAsync(users.deleteUser));

module.exports = router;