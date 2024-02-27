import express from 'express';
const Router = express.Router();

Router.use((req, res, next) => {
    // redirect if not https
    if(!req.secure && process.env.NODE_ENV !== "development") {
        return res.redirect(`https://${req.headers.host}${req.url}`);        
    }
    return next();
});

export {Router};