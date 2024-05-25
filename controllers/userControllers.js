exports.getAllUsers = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: null,
  });
};

exports.getAUser = (req, res) => {
  const userId = req.params.id;
  res.status(200).json({
    status: 'success',
    data: {
      id: userId,
    },
  });
};

exports.updateAUser = (req, res) => {
  const userId = req.params.id;
  res.status(200).json({
    status: 'success',
    data: {
      id: userId,
    },
  });
};

exports.createAUser = (req, res) => {
  res.status(201).json({
    status: 'success',
    data: {
      id: 1,
    },
  });
};

exports.deleteAUser = (req, res) => {
  const userId = req.params.id;
  res.status(201).json({
    status: 'success',
    data: {
      id: userId,
    },
  });
};
