const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
  console.log('Middlewere');
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};

const createATour = (req, res) => {
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

const getATour = (req, res) => {
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

const updateATour = (req, res) => {
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

const deleteATour = (req, res) => {
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

const getAllUsers = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: null,
  });
};

const getAUser = (req, res) => {
  const userId = req.params.id;
  res.status(200).json({
    status: 'success',
    data: {
      id: userId,
    },
  });
};

const updateAUser = (req, res) => {
  const userId = req.params.id;
  res.status(200).json({
    status: 'success',
    data: {
      id: userId,
    },
  });
};

const createAUser = (req, res) => {
  res.status(201).json({
    status: 'success',
    data: {
      id: 1,
    },
  });
};

const deleteAUser = (req, res) => {
  const userId = req.params.id;
  res.status(201).json({
    status: 'success',
    data: {
      id: userId,
    },
  });
};

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createATour);
// app.get('/api/v1/tours/:id', getATour);
// app.patch('/api/v1/tours/:id', updateATour);
// app.delete('/api/v1/tours/:id', deleteATour);

const tourRouter = express.Router();
app.use('/api/v1/tours', tourRouter);

const userRouter = express.Router();
app.use('/api/v1/users', userRouter);

tourRouter.route('/').get(getAllTours).post(createATour);
tourRouter.route('/:id').get(getATour).patch(updateATour).delete(deleteATour);

userRouter.route('/').get(getAllUsers).post(createAUser);
userRouter.route('/:id').get(getAUser).patch(updateAUser).delete(deleteAUser);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port} `);
});
