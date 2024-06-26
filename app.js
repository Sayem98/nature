const express = require('express');

const morgan = require('morgan');

const tourRouter = require('./routes/tourRouters');
const userRouter = require('./routes/userRouters');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('Middlewere');
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
