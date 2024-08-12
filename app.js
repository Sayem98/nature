const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoSanetizee = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');
const tourRouter = require('./routes/tourRouters');
const userRouter = require('./routes/userRouters');
const authRouter = require('./routes/authRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorControllers');

const app = express();
// global middlewere

// set security http headers
app.use(helmet());

// development looging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// limit request for same IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requiest from this ip please try in an hour !',
});

app.use('/api', limiter); // Q? What happens if i don't give '/api'

// body parser, reading data from body into req.body
app.use(
  express.json({
    limit: '10kb',
  }),
);

// data sanetization against noSQL query injection
app.use(mongoSanetizee());

// data sanetization against XSS
app.use(xss());

// prevent parameter polution
app.use(
  hpp({
    whitelist: ['duration'],
  }),
);

// serving static file.
app.use(express.static(`${__dirname}/public`));

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/reviews', reviewRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Cant't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
