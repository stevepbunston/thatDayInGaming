const express = require('express');
const router = express.Router({mergeParams: true});
const {validateReview, isReviewAuthorOrAdmin, ensureVerified} = require('../middleware');
const catchAsync = require('../utils/catchAsync');
const reviews = require('../controllers/reviews');


router.post('/', ensureVerified, validateReview, catchAsync(reviews.createReview));

router.delete('/:reviewId', ensureVerified, isReviewAuthorOrAdmin, catchAsync(reviews.deleteReview));

module.exports = router;