const mongoose = require("mongoose");
const attemptModel = require("../models/attempt");

async function getAllAttempts() {
  try {
    const results = await attemptModel.find();
    return results;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function create(body) {
  const userId = body.userID;
  const difficulty = body.difficulty;
  try {
    let attempt = new attemptModel({
      userID: userId,
      date: new Date(),
      difficulty: difficulty,
    });
    attempt.save();
    return attempt;
  } catch (error) {
    console.log(error);
    return null;
  }
}

module.exports = {
  getAllAttempts,
  create,
};
