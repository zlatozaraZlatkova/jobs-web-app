const cors = require("cors");

const corsWhitelists = {
  development: ["http://localhost:4200"],
  production: [
    "https://shrouded-ocean-76495-526ebbd06de6.herokuapp.com"
  ]
};
  const environment = process.env.NODE_ENV || "development";
  const whitelist = corsWhitelists[environment] || corsWhitelists.development;
  
  const corsMiddleware = cors({
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Origin",
      "Accept",
      "X-Requested-With",
    ],
    exposedHeaders: ["Set-Cookie"],
    maxAge: 36000, // 1 hour in seconds
    origin: function (origin, callback) {
      //Postman
      if (!origin || whitelist.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS policy`));
      }
    },
  });
  


  module.exports = corsMiddleware;
