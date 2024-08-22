const catchAsync = require('../utils/catchAsync');
const appError = require('../utils/appError');

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const data = await Model.findByIdAndDelete(req.params.id);
    if (!data) return next(new AppError('No tour was found with that id', 404));

    res.status(200).json({
      status: 'success',
      data: null,
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const data = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        data,
      },
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const data = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!data) return next(new AppError('No tour was found with that id', 404));
    res.status(200).json({
      status: 'success',
      data: {
        data,
      },
    });
  });
