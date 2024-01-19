const router = require("express").Router();

router.use((req, res, next) => {
    // redirect if not https

    if(process.env.NODE_ENV == "development") return next();

    if(!req.secure) {
        console.log("no secure route redirecting.");
        return res.redirect(`https://${req.headers.host}${req.url}`);        
    }

    // is https
    return next();
})

module.exports = router;