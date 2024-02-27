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
var publicPath = path.join(__dirname, "public/build");
app.use(express.static(publicPath));

// website
app.get("/*", (req, res) => {
    res.sendFile(publicPath + "/index.html");
});

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

// production listeners
if(process.env.NODE_ENV === "production")
{
    httpServer.listen(process.env.SERVER_PORT, ()=> { console.log(`http server running on port ${process.env.SERVER_PORT}`)});
    httpsServer.listen(process.env.SSL_SERVER_PORT, () => {console.log(`https running on port ${process.env.SSL_SERVER_PORT}`)});
}

// local development listen server 
if(process.env.NODE_ENV === "development") {
    app.listen(3050, ()=>{console.log("development server running")});
}