const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.tourId) {
    console.log(req.params.tourId);
    filter = { tour: req.params.tourId };
  }
  const reviews = await Review.find({
    filter,
  });
  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user._id;
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
