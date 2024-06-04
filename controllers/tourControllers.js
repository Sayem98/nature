const fs = require('fs');

const Tour = require('./../models/tourModel');

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    // results: tours.length,
    // data: {
    //   tours: tours,
    // },
  });
};

exports.createATour = async (req, res) => {
  console.log(req.body);
  try {
    const tour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent',
    });
  }
};

exports.getATour = (req, res) => {
  console.log(req.params);

  // const tour = tours.find((el) => el.id === Number(req.params.id));
  // if (!tour) {
  //   return res.status(404).json({
  //     status: 'fail',
  //     message: 'Invalid id',
  //   });
  // }
  res.status(200).json({
    status: 'success',
    // data: {
    //   tour: tour,
    // },
  });
};

exports.updateATour = (req, res) => {
  // const tour = tours.find((el) => el.id === Number(req.params.id));
  // if (!tour) {
  //   return res.status(404).json({
  //     status: 'fail',
  //     message: 'Invalid id',
  //   });
  // }

  res.status(200).json({
    status: 'Success',
    data: {
      tour: req.body,
    },
  });
};

exports.deleteATour = (req, res) => {
  // const tour = tours.find((el) => el.id === Number(req.params.id));
  // if (!tour) {
  //   return res.status(404).json({
  //     status: 'fail',
  //     message: 'Invalid id',
  //   });
  // }

  res.status(200).json({
    status: 'Success',
    data: null,
  });
};

// exports.checkID = (req, res, next, val) => {
//   console.log(val);
//   next();
// };
