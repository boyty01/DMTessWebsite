import express from "express";
import v1 from './api/v1/v1Api.mjs';

const Router = express.Router();

Router.use("/v1", v1);

export {Router};