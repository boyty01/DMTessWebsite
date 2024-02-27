import express from "express";
const Router = express.Router();
import * as ReportController from ("../../../controller/BugReport.mjs");

Router.get("/", (req, res) => {
    ReportController.fetchAllrecordsPaged(req, res);
});

Router.get("/:guid", (req,res) => {
    ReportController.getRecord(req, res);
});

Router.post("/", (req, res) => {
    ReportController.newRecord(req, res);
});

Router.put("/:guid", (req, res) => {

})

Router.get("/:guid/comments", (req, res) => {
    
})


Router.post("/:guid/comments", (req, res) => {

})

Router.get("/:guid/likes", (req, res) => {

})

Router.post("/:guid/likes", (req, res) => {

})

export default Router;