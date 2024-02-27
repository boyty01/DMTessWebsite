import mysql2 from 'mysql2/promise';

const connectionInfo = {
    host: process.env.DATABASE_HOST_ADDRESS,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    enableKeepAlive:true,
    keepAliveInitialDelay:0
}

const pool = mysql2.createPool(connectionInfo);

export function getConnection() {return pool.getConnection()};