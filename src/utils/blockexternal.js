
// middleware that prevents external ip addresses from hitting endpoints 
const blockExternal = (req, res, next) => {
    if (!req.ip || req.ip.split(":")[3] !== "127.0.0.1") {
        res.status(503);
        res.send();
        return;
    }
    
    next();
}

export default blockExternal;