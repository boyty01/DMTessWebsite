import * as pool from "../database/DbConnection.mjs";
import * as mysql from 'mysql2';
import Logger from '../log/Logger.mjs';
import ConstructorKeys from './environment/ConstructorKeys.json' assert {type: json};
import { uuidv4 } from 'uuid';

const tableName = "report"
const logVerbosity = Logger.GetLogVerbosityEnum();

export class BugReport {

    #creator;
    #guid;
    #reportBody;
    #platform;
    #reportGameTransform;
    #submissionDate;
    #clientVersion;
    #status;
    static #constructKey = ConstructorKeys.BugReport;

    constructor(constructKey, creator, reportBody, platform, reportTransform, submissionDate = null, clientVersion = null, status = null, guid = null) {
        if (constructKey !== BugReport.#constructKey) {
            throw new Error(`Bad access to BugReport constructor. Instantiation of BugReports must be done using the appropriate static function.`);
        };

        this.#creator = creator;
        this.#guid = guid;
        this.#reportBody = reportBody;
        this.#platform = platform;
        this.#reportGameTransform = reportTransform;
        this.#submissionDate = submissionDate;
        this.#clientVersion = clientVersion;
        this.#status = status;
    }

    /**
     * Create a new record and return it.
     * @param {string} creator 
     * @param {string} reportBody 
     * @param {string} platform 
     * @param {string} reportTransform 
     * @returns {BugReport}
     */
    static async createRecord(creator, reportBody, platform, reportTransform) {
        var record = new BugReport(BugReport.#constructKey, creator, reportBody, platform, reportTransform, uuidv4());
        record.save();
        return record;
    }

    /**
     * @async
     * Fetch the row associated with the specified key as a BugReport object.
     * @param {*} guid 
     * @returns {BugReport}
     */
    static async fetchRecord(guid) {

        try {
            var conn = await pool.getConnection();
            var result = await conn.execute(`SELECT * FROM ${tableName} WHERE guid = ? LIMIT 1`, [guid]);
            if (result[0]) {
                const record = result[0];
                return new BugReport(BugReport.#constructKey, record.creator, record.report_body, record.platform, record.report_transform, record.guid);
            }
            return null;
        }
        catch (e) {
            Logger.log(e);
            return null;
        }
    }

    /**
     * Get all rows from the bug report table.
     * @returns {array} array of BugReport objects
     */
    static async fetchAll() {
        try {
            var conn = await pool.getConnection();
            var results;
            conn.execute(`SELECT * FROM ${tableName}`)
                .then((records) => {
                    records.forEach(record => {
                        results.push(new BugReport(BugReport.#constructKey, record.creator, record.report_body, record.platform, record.report_transform, record.guid))
                    });
                })
            return results;
        }
        catch (e) {
            Logger.log("database", logVerbosity.medium, e);
            return null;
        }
    }

    static async deleteRecordById(guid) {
        try {
            var numDeleted = await pool.execute(`
            DELETE FROM ${tableName} WHERE guid = ?`, [guid]);

            return numDeleted > 0;
        }
        catch (e) {
            throw new Error(e);
        }
    }

    /**
     * Save changes to this record to the database.
     * @returns {null}
     */
    async save() {
        try {
            var conn = await pool.getConnection();

            await conn.execute(`
                INSERT INTO ${tableName} (guid, creator, report_body, platform, client_version, game_transform)
                VALUES (?,?,?,?,?,?)
                    ON DUPLICATE KEY UPDATE  
                    creator = values(creator),
                    report_body = values(report_body)
                    platform = values(platform),
                    client_version = values(client_version),
                    game_transform = values(game_transform)         
            `,
                [this.#guid, this.#creator, this.#reportBody, this.#platform, this.#clientVersion, this.#reportGameTransform]
            );

        }
        catch (e) {
            Logger.log("database", logVerbosity.high, "Database Error:" + e);
            return;
        }
    }

    /** Get a copy of all attributes
     * @returns {object} 
     */
    getFields() {
        return {
            guid: this.#guid,
            creator: this.#creator,
            reportBody: this.#reportBody,
            platform: this.#platform,
            reportGameTransform: this.#reportGameTransform,
            status: this.#status,
            clientVersion: this.#clientVersion,
            submissionDate: this.#submissionDate
        }
    }

    /**Set creator field */
    setCreator(newCreator) {
        this.#creator = newCreator;
    }

    /** Set report body field  */
    setReportBody(newBody) {
        this.#reportBody = newBody;
    }

    /**set platform field */
    setPlatform(newPlatform) {
        this.#platform = newPlatform;
    }

    /**set client version field */
    setclientVersion(newVersion) {
        this.#clientVersion = newVersion;
    }

    /** set game transform field.  */
    setReportGameTransform(newTransform) {
        this.#reportGameTransform = newTransform;
    }

    /**set report status field */
    setStatus(newStatus) {
        this.#status = newStatus;
    }

}