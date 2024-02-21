const jwtoken = require("jsonwebtoken");
//criar env
const SECRET = "Q1W2E3R4T5Y6U7I8O9P0";

const JWTOKEN = {
    createToken: (user) => {
        return jwtoken.sign(user, SECRET);
    },
    validateToken: (token) => {
        try {
            if (jwtoken.verify(token, SECRET)) {
                return true;
            }
            return false;
        } catch(error) {
            return false;
        }
    }
};

module.exports = JWTOKEN;