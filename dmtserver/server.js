require("dotenv").config();
const express = require("express");
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, "./public/build")));

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Web server running on port ${process.env.SERVER_PORT}`)
});
