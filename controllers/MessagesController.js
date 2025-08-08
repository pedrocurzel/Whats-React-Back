const returnError = require("../utils/error_return");
const {Op} = require("sequelize")
var database = require("../models");
var fs = require("fs/promises");
var Blob = require('blob');

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
            //for(let i = 0; i < response.length; i++) {
            //    if (response[i].type == 'blob') {
            //        let a = Blob.readAsBase64(response[i].blob);
            //        console.log(a);
            //    }
            //}
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
                text: body.message ?? body.text ?? null,
                blob: Buffer.from(body.blob,"base64") ?? null,
                senderId: body.senderId,
                receiverId: body.receiverId,
                type: body.type || "text"
            });
            return res.status(200).json({
                message: "Message created!",
                response
            })
        } catch(error) {
            return returnError(res, error);
        }
    }

    static async testeMsg(req, res) {
        try {
            let a = req.body;
            console.log(1);
            console.log(req.body);
        } catch(error) {
            return returnError(res, error);
        }
    }
}

module.exports = MessagesController;