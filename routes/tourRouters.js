const express = require('express');
const tourControllers = require('./../controllers/tourControllers');
const authontroller = require('../controllers/authController');
const router = express.Router();

// router.param('id', tourControllers.checkID);

router
  .route('/')
  .get(authontroller.protect, tourControllers.getAllTours)
  .post(tourControllers.createATour);
router
  .route('/:id')
  .get(tourControllers.getATour)
  .patch(tourControllers.updateATour)
  .delete(tourControllers.deleteATour);

module.exports = router;
