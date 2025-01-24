const express = require('express');
const cookieParser = require("cookie-parser");

require("dotenv").config();

const PORT = process.env.PORT || 5001;

const databaseConfig = require("./server/config/database");
const routesConfig = require("./server/config/routes");
const session = require("./server/middlewares/session");

start();

async function start() {
    const app = express();

    await databaseConfig(app);

    // Middleware
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.use(cookieParser());
    
    app.use(session());

    // Routes
    app.get("/", (req, res) => {
        res.json({ message: "REST service operational" });
    });

    routesConfig(app);


    app.listen(PORT, () => console.log(`Server started on port: ${PORT}...`));

}




