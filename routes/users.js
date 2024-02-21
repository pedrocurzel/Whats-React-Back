var express = require('express');
var validateTokenMiddleware = require('./middlewares/middleware');
const UserController = require('../controllers/UserController.js');
var router = express.Router();

router.get("/get-users/:id", validateTokenMiddleware, UserController.getUsers);

module.exports = router;
