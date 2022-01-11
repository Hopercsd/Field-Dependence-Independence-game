const mongoose = require("mongoose");
const questionModel = require("../models/question");

async function getAllQuestions() {
  try {
    const results = await questionModel.find();
    return results;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function create(body) {
  const userID = body.userID;
  const age = body.age;
  const sex = body.sex;
  const q1 = body.q1;
  const q2 = body.q2;
  const q3 = body.q3;
  const q4 = body.q4;
  try {
    let question = new questionModel({
      userID: userID,
      age: age,
      sex: sex,
      q1: q1,
      q2: q2,
      q3: q3,
      q4: q4,
    });
    question.save();
    return question;
  } catch (error) {
    console.log(error);
    return null;
  }
}

module.exports = {
  getAllQuestions,
  create,
};
