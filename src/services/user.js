const userModel = require("../models/user");

async function getAllUsers() {
  try {
    const results = await userModel
      .find({}, "totalScore")
      .sort([["totalScore", -1]])
      .limit(5);
    return results;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function getAUser(id) {
  try {
    const results = await userModel.findOne({ _id: id });
    return results;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function create(body) {
  const email = body.email;
  const aem = body.aem;
  try {
    let user = new userModel({
      email: email,
      aem: aem,
    });
    user.save();
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function destroy(id) {
  try {
    const results = await userModel.findByIdAndRemove({ _id: id });
    return results;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function update(id, body) {
  const email = body.email;
  const aem = body.aem;
  const totalScore = body.totalScore;
  const attemptsLeft = body.attemptsLeft;
  const easyTriesLeft = body.easyTriesLeft;
  const normalTriesLeft = body.normalTriesLeft;
  const hardTriesLeft = body.hardTriesLeft;
  try {
    const results = await userModel.findByIdAndUpdate(
      { _id: id },
      {
        totalScore: totalScore,
        attemptsLeft: attemptsLeft,
        email: email,
        aem: aem,
        easyTriesLeft: easyTriesLeft,
        normalTriesLeft: normalTriesLeft,
        hardTriesLeft: hardTriesLeft,
      },
      { new: true }
    );
    return results;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function checkForExistingUser(body) {
  const results = await userModel.findOne({ email: body.email });
  if (results) {
    return [true, results];
  }
  return [false, null];
}

module.exports = {
  getAllUsers,
  getAUser,
  create,
  destroy,
  update,
  checkForExistingUser,
};
