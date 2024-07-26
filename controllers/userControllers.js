const AppError = require('../utils/appError');

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

exports.deleteAUser = (req, res) => {
  const userId = req.params.id;
  res.status(201).json({
    status: 'success',
    data: {
      id: userId,
    },
  });
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1. Create error for password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('This route is not for updating password !', 400));
  }

  res.status(200).json({
    status: 'success',
  });
});
