const express = require("express");
const AuthenticateController = require("../controllers/AuthenticateController.js");

let routes = express.Router();

routes.post("/create-user", AuthenticateController.createUser);
routes.post("/login", AuthenticateController.login);
routes.get("/validate-token", AuthenticateController.validateToken);
module.exports = routes;