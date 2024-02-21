const database = require("../models");
const returnError = require("../utils/error_return");
const criptography = require("../utils/bcrypt.js");
const jwtoken = require("../utils/jwtoken.js");

class AuthenticateController {
    static async createUser(req, res) {
        const newUser = req.body;
        try {
            const userExists = await database.tblUsers.findOne({where: {
                email: newUser.email
            }});
            if (userExists) {throw new Error("User already exists!")}
            const [salt, hash] = await criptography.encrypt(newUser.password);
            newUser.salt = salt;
            newUser.hash = hash;
            const createdUser = await database.tblUsers.create(newUser);
            return res.status(201).json({
                error: false,
                message: "Created success",
                createdUserId: createdUser.id
            });
        } catch(error) {
            return returnError(res, error);
        }
    }

    static async login(req, res) {
        const userData = req.body;
        try {
            const dbUser = await database.tblUsers.findOne({where: {
                email: userData.email,
            }});
            if (!dbUser) {throw new Error("User does not exist!");}
            const correctPassword = await criptography.compare(userData.password, dbUser.hash);
            if (!correctPassword) {throw new Error("Incorrect password!")}
            const token = jwtoken.createToken({
                email: dbUser.email, name: dbUser.name
            });
            return res.status(200).json({
                message: "Login successfull!",
                token,
                name: dbUser.name,
                id: dbUser.id
            });
        } catch(error) {
            return returnError(res, error);
        }
    }

    static async validateToken(req, res) {
        const token = req.headers.authorization;
        try {
            return res.status(200).json({
                valid: jwtoken.validateToken(token)
            });
        } catch(error) {
            return returnError(res, error);
        }
    }
}

module.exports = AuthenticateController;