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
