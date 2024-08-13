const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find();
  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  const newReview = new Review({
    review: req.body.review,
    rating: req.body.rating,
    user: req.user._id,
    tour: req.body.tour,
  });
  await newReview.save();
  res.status(201).json({
    status: 'success',
    data: {
      review: newReview,
    },
  });
});