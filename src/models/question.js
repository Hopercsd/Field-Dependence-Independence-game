const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema(
    {
        userID: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
        sex: {
            type: String,
        },
        age: {
            type: Number,
        },
        q1: {
            type: String,
        },
        q2: {
            type: String,
        },
        q3: {
            type: String,
        },
        q4: {
            type: String,
        },    
    });
    
    
    const Question = mongoose.model("Question", questionSchema);
    module.exports = Question;