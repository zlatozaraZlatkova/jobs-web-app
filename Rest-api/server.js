const express = require("express");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");

require("dotenv").config();

const PORT = process.env.PORT || 5001;
const NODE_ENV = process.env.NODE_ENV || "development";

const databaseConfig = require("./server/config/database");
const routesConfig = require("./server/config/routes");
const corsConfig  = require("./server/config/cors");

const session = require("./server/middlewares/session");
const errorHandler = require("./server/middlewares/errorHandler");


start();

async function start() {
  const app = express();

  await databaseConfig(app);

  const maxRequests = NODE_ENV === "production" ? 1000 : 10000;

  app.use(rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: maxRequests,
    legacyHeaders: false, 
    standardHeaders: true,  
    message: 'Too many requests from this IP, please try again later', 
  }));
  
  if (NODE_ENV === "production") {
    const clientPath = path.join(__dirname, "../client/dist");
    app.use(express.static(clientPath));
  }

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(cookieParser());

  app.use(corsConfig);

  app.use(session());


  routesConfig(app);

  app.get("/", (req, res) => {
    res.json({ message: "REST service operational" });
  });


  if (NODE_ENV === "production") {
    const clientPath = path.join(__dirname, "../client/dist");
    
    app.get("*", (req, res, next) => {
      if (req.path.startsWith("/api/")) return next();
      res.sendFile("index.html", { root: clientPath });
    });
  }

  app.use(errorHandler);

  app.listen(PORT, () => console.log(`Server started on port: ${PORT}...`));
}
