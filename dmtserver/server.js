require("dotenv").config();
const express = require("express");
const fs = require("fs");
const http = require("http")
const https = require("https");
const path = require("path");
const app = express();
const httpsRedirect = require("./middleware/https_redirect.js");
// read SSL credentials
var sslKey = fs.readFileSync(process.env.SSL_PRIVATE_KEY_PATH, 'utf8');
var sslCert = fs.readFileSync(process.env.SSL_CERTIFICATE_PATH, 'utf8');
var credentials = {key: sslKey, cert: sslCert};

app.use("*", httpsRedirect);

// mount static directory
var publicPath = path.join(__dirname, "./public/build");
app.use(express.static(publicPath));


var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(process.env.SERVER_PORT, ()=> { console.log(`http server running on port ${process.env.SERVER_PORT}`)});
httpsServer.listen(process.env.SSL_SERVER_PORT, () => {console.log(`https running on port ${process.env.SSL_SERVER_PORT}`)});
