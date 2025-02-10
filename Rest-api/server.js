const express = require('express');
const cookieParser = require("cookie-parser");
const cors = require("cors");

require("dotenv").config();

const PORT = process.env.PORT || 5001;

const databaseConfig = require("./server/config/database");
const routesConfig = require("./server/config/routes");
const session = require("./server/middlewares/session");
const errorHandler = require("./server/middlewares/errorHandler");

start();

async function start() {
    const app = express();

    await databaseConfig(app);

    // Middleware
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.use(cookieParser());

    app.use(cors({
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
        maxAge: 36000 // 1 hours in seconds
    }));
    
    app.use(session());

    // Routes
    app.get("/", (req, res) => {
        res.json({ message: "REST service operational" });
    });

    routesConfig(app);
    
    app.use(errorHandler);

    app.listen(PORT, () => console.log(`Server started on port: ${PORT}...`));

}




