const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const sendEmail = require('../utils/email');

const signToken = (id) => {
  return jwt.sign(
    {
      id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  );
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = signToken(newUser._id);

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if ((!email, !password)) {
    return next(new AppError('Please provide email and password', 400));
  }
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or Password !', 401));
  }
  const token = signToken(user._id);

  res.status(201).json({
    status: 'success',
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('you are not logged in.', 401));
  }
  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decode.id);

  if (!currentUser) {
    return next(new AppError('No currentUser found with the token.', 401));
  }
  if (currentUser.changedPasswordAfter(decode.iat)) {
    return next(new AppError('Password recently changed !', 401));
  }
  req.user = currentUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403),
      );
    }
    next();
  };
};

exports.forgetPassword = catchAsync(async (req, res, next) => {
  // get user based on the mail
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    return next(new AppError('No user found with that mail', 404));
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({
    validateBeforeSave: false,
  });

  const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;
  const message = `Forgot your password? Submit patch request with new password and password confirm to ${resetUrl}.\nIf 
  you did not forhot your password please ignore this mail!`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'your password reset token (valid for 10 min)',
      message,
    });
  } catch (err) {
    console.log(err);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new AppError('Error sending email. Please try again later', 500),
    );
  }

  res.status(201).json({
    status: 'success',
    message: 'Token send to email',
  });
});

exports.resetPassword = catchAsync(async (req, res, next) => {});
