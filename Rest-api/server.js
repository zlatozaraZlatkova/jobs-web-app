const express = require('express');
require("dotenv").config();

const PORT = process.env.PORT || 5001;

const databaseConfig = require("./server/config/database");

start();

async function start() {
    const app = express();
    
    await databaseConfig(app);

    // Middleware
    app.use(express.json());

    // Routes
    app.get("/", (req, res) => {
        res.json({ message: "REST service operational" });
    });



    app.listen(PORT, () => console.log(`Server started on port: ${PORT}...`));

}




