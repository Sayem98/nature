const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json());

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

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createATour);
// app.get('/api/v1/tours/:id', getATour);
// app.patch('/api/v1/tours/:id', updateATour);
// app.delete('/api/v1/tours/:id', deleteATour);

app.route('/api/v1/tours').get(getAllTours).post(createATour);
app
  .route('/api/v1/tours/:id')
  .get(getATour)
  .patch(updateATour)
  .delete(deleteATour);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port} `);
});
