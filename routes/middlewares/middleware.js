var jwtoken = require("../../utils/jwtoken.js");

function validateTokenMiddleware(req, res, next) {
    const token = req.headers.authorization;
    if (token) {
        if (jwtoken.validateToken(token)) {
            return next();
        }
        return invalidToken(res);
    }
    return invalidToken(res);
}

function invalidToken(res) {
    return res.status(401).json({
        message: "invalid token"
    });
}

module.exports = validateTokenMiddleware;