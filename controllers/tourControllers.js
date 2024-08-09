const fs = require('fs');
const Tour = require('./../models/tourModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllTours = catchAsync(async (req, res, next) => {
  // console.log(req.query);
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
  } else {
    // default
    query = query.sort('-createdAt');
  }
  //limiting field
  if (req.query.fields) {
    const fields = req.query.fields.split(',').join(' ');
    query = query.select(fields + ' -_id');
  } else {
    // default
    query = query.select('-__v');
  }

  //pagination
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 100;
  const skip = (page - 1) * limit;
  query = query.skip(skip).limit(limit);

  if (req.query.page) {
    const numTours = await Tour.countDocuments();
    if (skip >= numTours)
      return next(new AppError('This page does not exists', 404));
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
  const {
    name,
    rating,
    price,
    duration,
    difficulty,
    startLocation,
    locations,
    guides,
  } = req.body;
  const tour = new Tour({
    name: name,
    rating: rating,
    price: price,
    duration: duration,
    difficulty: difficulty,
    startLocation: startLocation,
    locations: locations,
    guides: guides,
  });

  await tour.save();

  res.status(201).json({
    status: 'success',
    data: {
      tour: tour,
    },
  });
});

exports.getATour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id).populate('guides');
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
