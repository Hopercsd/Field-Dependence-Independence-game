const express = require('express');
const userRoute = require('./user');
const attemptRoute = require('./attempt');
const gameRoute = require('./game');
const questionRoute = require('./question');
const hftSARoute = require('./hftSA');


const router = express.Router();

router.use("/users",userRoute);
router.use("/attempts", attemptRoute);
router.use("/games", gameRoute);
router.use("/questions", questionRoute);
router.use("/hftSAs", hftSARoute);

module.exports = router;