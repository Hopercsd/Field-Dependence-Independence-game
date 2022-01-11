const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema(
{
    attemptID: {
        type: mongoose.Types.ObjectId,
        ref: 'Attempt',
    },
    reactionTimeTable: {
        type: [Number],
    },
    successTable: {
        type: [Boolean],
    },
    memorizeShapesTime: {
        type: Number
    }
});

const Game = mongoose.model("Game", gameSchema);
module.exports = Game;