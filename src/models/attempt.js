const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const attemptSchema = new Schema(
{
    userID: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    date: {
        type: Date,
    },
    difficulty: {
        type: String,
        enum: {values: ['easy','normal','hard'], message: 'Difficulty level is either: easy, normal, or hard'},
    }
});

const Attempt = mongoose.model("Attempt", attemptSchema);
module.exports = Attempt;