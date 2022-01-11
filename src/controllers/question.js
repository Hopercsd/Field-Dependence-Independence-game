const questionService = require("../services/question");
const userService = require("../services/user");

const indexQuestions = async (req, res, next) => {
  const questions = await questionService.getAllQuestions();
  if (!questions) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
  return res.status(200).json({
    Questions: questions,
  });
};

const create = async (req, res, next) => {
  const body = req.body;
  const question = await questionService.create(body);
  return res.status(200).json({
    Question: question,
  });
};

module.exports = {
  indexQuestions,
  create,
};
