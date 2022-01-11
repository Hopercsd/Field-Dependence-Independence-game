const gameModel = require("../models/game");

async function getAllGames() {
  try {
    const results = await gameModel.find();
    return results;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function create(body) {
  const attemptId = body.attemptID;
  const reactionTimeTable = body.reactionTimeTable;
  const successTable = body.successTable;
  const memorizeShapesTime = body.memorizeShapesTime;
  try {
    let game = new gameModel({
      attemptID: attemptId,
      reactionTimeTable: reactionTimeTable,
      successTable: successTable,
      memorizeShapesTime: memorizeShapesTime,
    });
    game.save();
    return game;
  } catch (error) {
    console.log(error);
    return null;
  }
}

module.exports = {
  getAllGames,
  create,
};
