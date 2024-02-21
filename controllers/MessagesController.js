const returnError = require("../utils/error_return");
const {Op} = require("sequelize")
var database = require("../models");

class MessagesController {
    static async getMessages(req,res) {
        const {id, id2} = req.params;
        try {
            const response = await database.Messages.findAll({
                where: {
                    [Op.or]: [{senderId: id, receiverId: id2}, {senderId: id2, receiverId: id}]
                },
                order: [
                    ['createdAt', 'ASC'],
                ]
            });
            return res.status(200).json({
                error:false,
                response
            });
        } catch(error) {
            return returnError(res, error);
        }
    }

    static async sendMessage(req, res) {
        const body = req.body;
        try {
            const response = await database.Messages.create({
                text: body.message,
                senderId: body.senderId,
                receiverId: body.receiverId,
                type: "text"
            });
            return res.status(200).json({
                message: "Message created!",
                response
            })
        } catch(error) {
            return returnError(res, error);
        }
    }
}

module.exports = MessagesController;