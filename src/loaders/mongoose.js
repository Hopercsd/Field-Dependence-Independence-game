const mongoose = require('mongoose');
const config = require('../config/index');


async function connectToMongoDB(){ 
    try {
        mongoose.set('useFindAndModify', false);
        await mongoose.connect(config.uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Database Connection Established");
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = connectToMongoDB;