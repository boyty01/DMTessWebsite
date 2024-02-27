import * as pool from "../database/DbConnection.mjs";
import Logger from '../log/Logger.mjs';
import ConstructorKeys from './environment/ConstructorKeys.json' assert {type: json};
import { uuidv4 } from 'uuid';

const tableName = "report_comment"
const logVerbosity = Logger.GetLogVerbosityEnum();

export class BugReportComment {

    #commentId;
    #reportId;
    #comment;
    #author;
    #date;
    static #constructorKey = ConstructorKeys.bugReportComment;


    constructor(key, commentId, reportId, author, comment, date) {
        if (key !== BugReportComment.#constructorKey) {
            throw new Error("Accessed BugReportComment private constructor without valid authorisation.");
        }
        this.#commentId = commentId;
        this.#reportId = reportId;
        this.#author = author;
        this.#comment = comment;
        this.#date = date;
    };


    static async makeComment(author, comment) {
        var record = new BugReportComment(BugReportComment.#constructorKey, uuidv4(), reportId, author, comment);
        record.save();
        return record;
    }


    static async getComment(commentId) {
        try {
            var conn = await pool.getConnection();
            var result = await conn.execute(`
            SELECT * FROM ${tableName}
            WHERE id = ? `, [commentId]);
            
            var asComment;
            if(result[0]) asComment = new BugReportComment(BugReportComment.#constructorKey, record.report_id, record.author, record.comment, record.submission_date);

            return asComment;
        }        
        catch(e) {

        }
    }


    static async getCommentsForReport(reportGuid) {
        try {
            var conn = await pool.getConnection();
            var results = await conn.execute(`
            SELECT * FROM ${tableName} 
            WHERE report_id = ?`
            ,[reportGuid]);

            var asComments = [];

            results.forEach(record => {
                asComments.push(new BugReportComment(BugReportComment.#constructorKey, record.report_id, record.author, record.comment, record.submission_date));
            });

            return asComments;
        }        
        catch(e) {
            Logger.log("database", logVerbosity.medium, e);
        }
    }


    static async deleteComment(id) {
        try {

            var conn = await pool.getConnection()
            var affected = await conn.execute(`
            DELETE FROM ${tableName}
            WHERE id = ?            
            `, [id]);

            return affected > 0;
        }
        catch(e) {
            Logger.log("database", logVerbosity.medium, e);
        }

    }


    getFields() {
        return {
            author: this.#author,
            comment: this.#comment,
            date: this.#date
        };
    }


    async save() {
        try {

            var conn = await pool.getConnection();
            var result = conn.execute(`
            INSERT INTO ${tableName} (id, author, report_id, comment)
                VALUES (?,?,?,?)
            ON DUPLICATE KEY UPDATE  
                comment = values(comment)
            `, [this.#commentId, this.#author, this.#reportId, this.#comment]);
        }
        catch(e) {
            Logger.log("database", logVerbosity.medium, e);            
        }
    }

}