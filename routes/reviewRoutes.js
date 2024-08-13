const reviewContoller = require('../controllers/reviewController');
const authController = require('../controllers/authController');
const express = require('express');

const router = express.Router({
  mergeParams: true,
});

router
  .route('/')
  .get(reviewContoller.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewContoller.createReview,
  );

module.exports = router;
