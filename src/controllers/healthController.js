const { healthService } = require("../services");

const getHealth = (req, res) => {
  const data = healthService.getStatus();

  res.status(200).json(data);
};

module.exports = {
  getHealth
};
