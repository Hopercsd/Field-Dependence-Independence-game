require('dotenv').config();


module.exports = {
    port: process.env.PORT,
    uri: process.env.MONGODB_URI,
}