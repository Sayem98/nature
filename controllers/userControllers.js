const User = require('../models/userModel');
const AppError = require('../utils/appError');
const factory = require('./handleFactory');
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

exports.getAllUsers = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: null,
  });
};

exports.getAUser = (req, res) => {
  const userId = req.params.id;
  res.status(200).json({
    status: 'success',
    data: {
      id: userId,
    },
  });
};

exports.updateAUser = (req, res) => {
  const userId = req.params.id;
  res.status(200).json({
    status: 'success',
    data: {
      id: userId,
    },
  });
};

exports.createAUser = (req, res) => {
  res.status(201).json({
    status: 'success',
    data: {
      id: 1,
    },
  });
};

exports.deleteAUser = factory.deleteOne(User);

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1. Create error for password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('This route is not for updating password !', 400));
  }

  // update the user document.
  const filteredBody = filterObj(req.body, 'name', 'email');
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runVaidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});
