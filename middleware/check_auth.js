const jwt = require('jsonwebtoken');

module.exports = (req, resp, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decode = jwt.verify(token, process.env.JWT_KEY, null);
        req.userData = decode;
        next();

    } catch (error) {
        resp.status(500).json({
            message: "Auth Fail or Token expired!",
            error: error
        })
    }
}