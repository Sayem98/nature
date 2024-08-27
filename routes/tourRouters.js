const express = require('express');
const tourControllers = require('./../controllers/tourControllers');
const authontroller = require('../controllers/authController');
const reviewRouter = require('./reviewRoutes');
const router = express.Router();

// router.param('id', tourControllers.checkID);

router.use('/:tourId/reviews', reviewRouter);

router
  .route('/')
  .get(tourControllers.getAllTours)
  .post(
    authontroller.protect,
    authontroller.restrictTo('admin', 'lead-guide'),
    tourControllers.createATour,
  );
router
  .route('/:id')
  .get(tourControllers.getATour)
  .patch(
    authontroller.protect,
    authontroller.restrictTo('admin', 'lead-guide'),
    tourControllers.updateATour,
  )
  .delete(
    authontroller.protect,
    authontroller.restrictTo('admin', 'lead-guide'),
    tourControllers.deleteATour,
  );

module.exports = router;
