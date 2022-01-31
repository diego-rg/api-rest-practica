const express = require('express');
const userController = require('../controllers/user');
const middleAuthen = require("../middleware/authentication.js");

const api = express.Router();

api.post("/register", userController.registerUser);
api.post("/login", userController.loginUser);
api.get("/protected", middleAuthen.authUser, userController.protectedRoute);

module.exports = api;