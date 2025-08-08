var express = require("express");
var validateTokenMiddleware = require("./middlewares/middleware.js");
const MessagesController = require("../controllers/MessagesController");

const router = express.Router();

router.get("/get-messages/:id/:id2", validateTokenMiddleware, MessagesController.getMessages);
router.post("/send-message", validateTokenMiddleware, MessagesController.sendMessage);
router.post("/teste-msg", MessagesController.testeMsg);

module.exports = router;