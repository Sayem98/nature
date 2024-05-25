const fs = require('fs');
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};

exports.createATour = (req, res) => {
  console.log(req.body);
  const newId = tours.length;
  const newTour = Object.assign(
    {
      id: newId,
    },
    req.body
  );
  tours.push(newTour);
  res.send('Tour Created successfully');
};

exports.getATour = (req, res) => {
  console.log(req.params);

  const tour = tours.find((el) => el.id === Number(req.params.id));
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid id',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: tour,
    },
  });
};

exports.updateATour = (req, res) => {
  const tour = tours.find((el) => el.id === Number(req.params.id));
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid id',
    });
  }

  res.status(200).json({
    status: 'Success',
    data: {
      tour: req.body,
    },
  });
};

exports.deleteATour = (req, res) => {
  const tour = tours.find((el) => el.id === Number(req.params.id));
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid id',
    });
  }

  res.status(200).json({
    status: 'Success',
    data: null,
  });
};

exports.checkID = (req, res, next, val) => {
  console.log(val);
  next();
};
