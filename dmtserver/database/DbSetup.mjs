/**
 * Creates the schema structure specified in ./Schema.json. Should be run when installing the backend onto a new server. 
 * Designed as an ES6 module, but currently expects to be run directly from the command line. For integration as a module, remove the last line
 * that invokes runSetup() and invoke it from your outer as required.
 */

import { } from 'dotenv/config';
import mysql2 from 'mysql2/promise';
import Schema from './Schema.json' assert { type: 'json' };

const connectionInfo = {
    host: process.env.DATABASE_HOST_ADDRESS,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
}

var connection;
export async function runSetup() {
    try {        
        connection = await mysql2.createConnection(connectionInfo);
        await createDatabase();
        await connection.query(`USE ${Schema.schemaName}`);        
        await createTables();        
        console.log("Schema setup complete.");
        process.exit();
    }
    catch (e) {
        throw new Error(e);
    }
}


async function createDatabase() {
    console.log("creating connection");
    var set = await connection.execute(`
        SHOW DATABASES LIKE '${Schema.schemaName};'`
    );

    // if this is true, then the database already exists and we should abort.
    if (set[0].length > 0) {
        throw new Error("Database setup aborted. schema already exists.");
    }

    await connection.query(`
        CREATE DATABASE ${Schema.schemaName};
    `);

    console.log(`Created database ${Schema.schemaName}`);
}

async function createTables() {
        //Loop through schema json and create all specified tables. 
        for(const table of Schema.tables) {
            var fields = "(";

            for(const field of table.fields) {
                if (!field.name) return;

                fields += `\n ${field.name} ${field.type} ${field.constraints},`
            };

            var constraints = table.constraints;

            // remove the last comma if constraints are not specified
            if (constraints.length === 0) fields = fields.replace(/.$/, "");

            var query = `
            CREATE TABLE ${table.tableName}
            ${fields}
            ${constraints})
            ;`
            var res = await connection.execute(query);
            console.log(`created table ${table.tableName}`);
        };        
}

runSetup();