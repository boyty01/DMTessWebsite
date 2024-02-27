import {} from 'dotenv/config';
import express from 'express';
import session from 'express-session';
import MySQLStore from 'express-mysql-session'; 
const mySQLStore = MySQLStore(session);
import * as mysql2 from 'mysql2';
import * as fs from 'fs';
import * as http from 'http';
import * as https from 'https';
import * as path from 'path';
import {Router as httpsRedirect} from './middleware/https_redirect.mjs';
import {Router as api} from "./route/Route_Api.mjs";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());

// read SSL credentials
var sslKey = fs.readFileSync(process.env.SSL_PRIVATE_KEY_PATH, 'utf8');
var sslCert = fs.readFileSync(process.env.SSL_CERTIFICATE_PATH, 'utf8');
var credentials = {key: sslKey, cert: sslCert};

var connectionOptions =
{
  host: process.env.DATABASE_ADDRESS,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const sessionPool = mysql2.createPool(connectionOptions)
const sessionStore = new mySQLStore({}, sessionPool);


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: process.env.NODE_ENV === "production" ? true : false,
        httpOnly: true,
        sameSite:process.env.NODE_ENV === "production" ? "strict" : "lax"
    },
    store:sessionStore,
    saveUninitialized:false,
    })
)

app.use("*", httpsRedirect);

app.use("/api", api);

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