const express = require('express');

const router = express.Router();
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

router.route('/').get(getAllUsers).post(createAUser);
router.route('/:id').get(getAUser).patch(updateAUser).delete(deleteAUser);

module.exports = router;
