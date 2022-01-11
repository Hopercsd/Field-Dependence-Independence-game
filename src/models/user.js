const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
{
    email: {
        type: String,
    },
    aem: {
        type: Number,
    },
    attemptsLeft: {
        type: Number,
        default: 4,
    },
    totalScore: {
        type: Number,
        default: 0,
    },
    easyTriesLeft: {
        type: Number,
        default: 2,
    },
    normalTriesLeft: {
        type: Number,
        default: 2,
    },
    hardTriesLeft: {
        type: Number,
        default: 2,
    }
    
});


const User = mongoose.model("User", userSchema);
module.exports = User;