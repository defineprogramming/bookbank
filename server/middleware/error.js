const express = require('express');

// Middleware for handling errors
function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    console.error(err.stack);
    res.status(500);
    res.render('error', { error: err });
}

module.exports = errorHandler;