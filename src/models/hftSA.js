const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hftSASchema = new Schema(
{
    userID: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    version: {
        type: String,
    },
    actions: {
        type: 
        [{
             description: String,
             component_id: Object,
             time: Number,
             extra: Object,
        }],
    },
    answers: {
        type: 
        [{
            question: String,
            value: Object,
            status: Boolean,
       }],
    },
});

const HftSA = mongoose.model("HftSA", hftSASchema);
module.exports = HftSA;