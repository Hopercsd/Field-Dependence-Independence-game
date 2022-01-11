const mongoose = require("mongoose");
const hftSAModel = require("../models/hftSA");

async function getAllHftSA() {
  try {
    const results = await hftSAModel.find();
    return results;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function create(body) {
  const userId = body.userID;
  const version = body.version;
  const actions = body.actions;
  const answers = body.answers;
  try {
    let hftSA = new hftSAModel({
      userID: userId,
      version: version,
      actions : actions ,
      answers: answers,
    });
    hftSA.save();
    return hftSA;
  } catch (error) {
    console.log(error);
    return null;
  }
}


module.exports = {
  getAllHftSA,
  create,
};
