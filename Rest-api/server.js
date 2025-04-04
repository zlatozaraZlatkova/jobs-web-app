const express = require("express");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");

require("dotenv").config();

const PORT = process.env.PORT || 5001;

const databaseConfig = require("./server/config/database");
const routesConfig = require("./server/config/routes");
const corsConfig  = require("./server/config/cors");

const session = require("./server/middlewares/session");
const errorHandler = require("./server/middlewares/errorHandler");


start();

async function start() {
  const app = express();

  await databaseConfig(app);

  app.use(rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100000,
    legacyHeaders: false, 
    standardHeaders: true,  
    message: 'Too many requests from this IP, please try again later', 
  }));
  

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(cookieParser());

  app.use(corsConfig);

  app.use(session());

  app.get("/", (req, res) => {
    res.json({ message: "REST service operational" });
  });

  routesConfig(app);

  app.use(errorHandler);

  app.listen(PORT, () => console.log(`Server started on port: ${PORT}...`));
}
