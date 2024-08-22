const Tour = require('./../models/tourModel');
const factory = require('./handleFactory');

exports.getAllTours = factory.getAll(Tour);
exports.createATour = factory.createOne(Tour);
exports.getATour = factory.getOne(Tour);
exports.updateATour = factory.updateOne(Tour);
exports.deleteATour = factory.deleteOne(Tour);

// exports.checkID = (req, res, next, val) => {
//   console.log(val);
//   next();
// };
