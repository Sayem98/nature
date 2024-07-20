const express = require('express');
const tourControllers = require('./../controllers/tourControllers');
const authontroller = require('../controllers/authController');
const router = express.Router();

// router.param('id', tourControllers.checkID);

router
  .route('/')
  .get(authontroller.protect, tourControllers.getAllTours)
  .post(authontroller.protect, tourControllers.createATour);
router
  .route('/:id')
  .get(tourControllers.getATour)
  .patch(tourControllers.updateATour)
  .delete(
    authontroller.protect,
    authontroller.restrictTo('admin', 'lead-guide'),
    tourControllers.deleteATour,
  );

module.exports = router;
