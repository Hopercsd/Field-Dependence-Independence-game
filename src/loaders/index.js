const express = require('express');
const loadExpress = require('./express');
const mongooseConnect = require('./mongoose');

function initApp(app) {
    app = loadExpress(app);
    if (!mongooseConnect()){
        process.exit(1);
    }
    return app;
}

module.exports = initApp;