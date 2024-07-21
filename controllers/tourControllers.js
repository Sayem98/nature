const fs = require('fs');
const Tour = require('./../models/tourModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllTours = catchAsync(async (req, res, next) => {
  console.log(req.query);
  // const tours = await Tour.find(req.query);

  const queryObj = { ...req.query };
  const excludeFields = ['page', 'sort', 'limit', 'fields'];
  excludeFields.forEach((el) => delete queryObj[el]);

  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

  let query = Tour.find(JSON.parse(queryStr));

  // sorting -price for decending order.
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  }

  const tours = await query;

  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours,
    },
  });
});

exports.createATour = catchAsync(async (req, res, next) => {
  const tour = await Tour.create({
    name: req.body.name,
    rating: req.body.rating,
    price: req.body.price,
    duration: req.body.duration,
    difficulty: req.body.difficulty,
  });
  res.status(201).json({
    status: 'success',
    data: {
      tour: tour,
    },
  });
});

exports.getATour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id);
  if (!tour) return next(new AppError('No tour was found with that id', 404));
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

exports.updateATour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!tour) return next(new AppError('No tour was found with that id', 404));
  res.status(200).json({
    status: 'success',
    data: {
      tour: tour,
    },
  });
});

exports.deleteATour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndDelete(req.params.id);
  if (!tour) return next(new AppError('No tour was found with that id', 404));

  res.status(200).json({
    status: 'success',
    data: null,
  });
});

// exports.checkID = (req, res, next, val) => {
//   console.log(val);
//   next();
// };
