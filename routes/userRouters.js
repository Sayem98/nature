const express = require('express');
const userControllers = require('./../controllers/userControllers');
const authController = require('./../controllers/authController');
const router = express.Router();

router.patch('/updateMe', authController.protect, userControllers.updateMe);

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
