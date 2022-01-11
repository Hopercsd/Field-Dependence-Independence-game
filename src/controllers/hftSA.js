const hftSAService = require("../services/hftSA");

const index = async (req, res, next) => {
  const hftSAs = await hftSAService.getAllHftSA();
  if (!hftSAs) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
  return res.status(200).json({
    HftSAs: hftSAs,
  });
};

const create = async (req, res, next) => {
  const body = req.body;
  const hftSA = await hftSAService.create(body);
  return res.status(200).json({
    HftSA: hftSA,
  });
};

module.exports = {
  index,
  create,
};
