const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:4200',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
        'Content-Type', 
        'Authorization',
        'Origin',
        'Accept',
        'X-Requested-With'
    ],
    exposedHeaders: ['Set-Cookie'],
    maxAge: 36000 // 1 hour in seconds
};

const corsConfig = cors(corsOptions);

module.exports = corsConfig



