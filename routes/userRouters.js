const express = require('express');
const userControllers = require('./../controllers/userControllers');
const authController = require('./../controllers/authController');
const factory = require('./handleFactory');

const router = express.Router();

router.patch('/updateMe', authController.protect, userControllers.updateMe);
router.patch('/resetPassword', authController.resetPassword);
router.get(
  '/me',
  authController.protect,
  userControllers.getMe,
  factory.getOne(User),
);

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
