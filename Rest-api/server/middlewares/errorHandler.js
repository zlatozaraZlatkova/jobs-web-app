const { errorParser } = require('../util/errorParser');

const errorHandler = (err, req, res, next) => {
    console.log('Error in middleware:', err);
    console.log('Error type in middleware:', err.name);
    const { statusCode, message } = errorParser(err);
    res.status(statusCode).json({ message });
};

module.exports = errorHandler;