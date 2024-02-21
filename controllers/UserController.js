const database = require("../models");
const returnError = require("../utils/error_return.js");
const { Op } = require("sequelize");

class UserController {
    static async getUsers(req, res) {
        const {id} = req.params;
        try {
            const response = await database.tblUsers.findAll({
                where: {
                    id: {
                        [Op.not]: id
                    }
                },
                attributes: ['id', 'name', "email"], 
            });
            return res.status(200).json({
                response
            })
        } catch(error) {
            return returnError(res, error);
        }
    }
}

module.exports = UserController;