const express = require('express');
const userControllers = require('./../controllers/userControllers');
const authController = require('./../controllers/authController');
const factory = require('../controllers/handleFactory');
const User = require('../models/userModel');
const router = express.Router();

router.use(authController.protect);

router.patch('/updateMe', userControllers.updateMe);
router.get('/me', userControllers.getMe, factory.getOne(User));

router
  .route('/')
  .get(userControllers.getAllUsers)
  .post(userControllers.createAUser);
router
  .route('/:id')
  .get(userControllers.getAUser)
  .patch(userControllers.updateAUser)
  .delete(userControllers.deleteAUser);

module.exports = router;
