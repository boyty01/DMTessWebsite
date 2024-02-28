import express from "express";

const Router = express.Router();



/**
 * query whether this session is linked to an authenticated login. 
 */
Router.get("/session/authenticated", (req, res) => {

    var responseBody = {isLoggedIn:false};

    if(req.session && req.session.isLoggedIn) {
        responseBody.isLoggedIn = true;
        responseBody.username = req.session.username;
    };

    res.status(200).send(responseBody);
});


export default Router;