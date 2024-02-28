import * as pool from "../database/DbConnection.mjs";
import Logger from '../log/Logger.mjs';
import ConstructorKeys from './environment/ConstructorKeys.json' assert {type: json};
import bcrypt from 'bcrypt';

const tableName = "user";
const passwordMinLength = 8;
const passwordMaxLength = 50; // this is to be absolutely certain that we fit within bcrypts limitations.
const saltRounds = 10;

export default class User {

    #userId;
    #username;
    #hash;
    #registrationDate;
    #accountLevel;
    static #constructorKey = ConstructorKeys.User;


    constructor(key, id, username, hash, registrationDate, accountLevel) {
        if (key !== User.#constructorKey) {
            throw new Error("Attempted to access private constructor for User. Use User.createNewUser() or User.#makeUser() appropriately");
        }
        this.#userId = id;
        this.#username = username;
        this.#hash = hash;
        this.#registrationDate = registrationDate;
        this.#accountLevel = accountLevel;
    }

    
    /**
     * internal function for creating user objects from rows that exist in the database. Private.
     * @param {*} username 
     * @param {*} hash 
     * @param {*} registrationDate 
     * @param {*} accountLevel 
     * @returns 
     */
    static async #makeUser(username, id, hash, registrationDate, accountLevel) {
        return new User(User.#constructorKey, id, username, hash, registrationDate, accountLevel);
    }


    /**
     * Create a new user record with the given username and plaintext password. 
     * @param {string} username 
     * @param {string} password 
     * @param {string} accountLevel 
     */
    static async createNewUser(username, password, accountLevel) {

        if(!User.validateUsernameFormat(username) || !User.validatePasswordFormat(password)) return null;

        var hashedPw = await User.hashPassword(password);
        var user = new User(User.#constructorKey, null, username, hashedPw, Date.now(), accountLevel);
        user.save();
        return
    }


    /**
     * Hash the given password. Does not run validation on the password string, so ensure you run the appropriate checks before hashing it.
     * @param {string} password 
     * @returns {Promise<string>} hashed password
     */
    static async hashPassword(password) {
        const hash = await bcrypt.hash(password, saltRounds);
        return hash;
    }


    /**
     * Get user row by username.
     * @param {string} username 
     * @returns 
     */
    static async getUserByUsername(username) {
        var conn = await pool.getConnection();
        var result = await conn.execute(`
        SELECT * FROM ${tableName} 
        WHERE
            username = ?`,
            [username]
        );

        // if no row found.
        if(!Array.isArray(result) || result.length !== 1) {            
            return null;
        }
        
        return User.#makeUser(User.#constructorKey, result[0].id, result[0].username, result[0].hash_password, result[0].accountLevel);
    };


    /**
     * Authenticate the given user / password combo. 
     * @param {*} username 
     * @param {*} password 
     */
    static async authenticate(username, password) {
        var userObj = await User.getUserByUsername(username);
        if(!userObj || !userObj.#hash) return false;

        var valid = await bcrypt.compare(password, userObj.#hash);

        return valid;
    }


    /**
     * Query the user table for the given username. returns true if the username does not exist.
     * @param {string} username 
     * @returns 
     */
    static async assertUsernameAvailable(username) {
        var conn = await pool.getConnection();
        var result = await conn.execute(`
        SELECT 
            username FROM ${tableName} 
        WHERE
            username = ?`,
            [username]
        );

        if (result[0]) {
            return false;
        }

        return true;
    }


    /**
     * Change the password for the specified username. runs validation checks internally.
     * @param {string} username username to update
     * @param {string} password plaintext password
     * @returns 
     */
    static async changePassword(username, password) {

        this.validatePasswordFormat(password);
        var user = await this.getUserByUsername(username);
        if(!user) return false;

        var hash = await this.hashPassword(password);
        user.#hash = hash;
        user.save();
        return true;
    }


    /**
     * Test a username for valid formatting. 
     * @param {string} username 
     * @returns 
     */
    static validateUsernameFormat(username) {
        return new RegExp(/^[a-zA-Z][a-zA-Z0-9]+/).test(username);
    }


    /**
     * Runs the plaintext password through the validation checks. returns true if the password meets requirements.
     * @param {string} password 
     * @returns {bool}
     */
    static validatePasswordFormat(password) {

        if (password.length < passwordMinLength || password.length > passwordMaxLength) return false;

        return true;
    }


    /**
     * Save/update this record to the db.
     */
    async save() {

    }

}