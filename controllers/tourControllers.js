const fs = require('fs');

const Tour = require('./../models/tourModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllTours = catchAsync(async (req, res, next) => {
  const tours = await Tour.find();
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours,
    },
  });
});

exports.createATour = catchAsync(async (req, res, next) => {
  console.log(req.body);

  const tour = await Tour.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      tour: tour,
    },
  });
});

exports.getATour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id);
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
  res.status(200).json({
    status: 'success',
    data: {
      tour: tour,
    },
  });
});

exports.deleteATour = catchAsync(async (req, res, next) => {
  await Tour.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: 'success',
    data: null,
  });
});

// exports.checkID = (req, res, next, val) => {
//   console.log(val);
//   next();
// };
