const attemptService = require("../services/attempt");

const indexAttempts = async (req, res, next) => {
  const attempts = await attemptService.getAllAttempts();
  if (!attempts) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
  return res.status(200).json({
    Attempts: attempts,
  });
};

const create = async (req, res, next) => {
  const body = req.body;
  const attempt = await attemptService.create(body);
  res.cookie("attempt", `${attempt._id}`, { maxAge: 7200000 });
  return res.status(200).json({
    Attempt: attempt,
  });
};

module.exports = {
  indexAttempts,
  create,
};
