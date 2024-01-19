const router = require("express").Router();

router.use((req, res, next) => {
    // redirect if not https
    if(!req.secure && process.env.NODE_ENV !== "development") {
        return res.redirect(`https://${req.headers.host}${req.url}`);        
    }
    
    return next();
})

module.exports = router;