import express from "express";
import BugReportRoute from './BugReport.mjs';
import UserRoute from './User.mjs';

const Router = express.Router();

Router.use("/bugreport", BugReportRoute);

Router.use("/user", UserRoute);

export default Router;