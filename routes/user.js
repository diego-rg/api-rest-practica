const express = require('express');
const multiparty = require("connect-multiparty");//dependencia para mandar ficheros
const userController = require('../controllers/user');
const middleAuthen = require("../middleware/authentication.js");
const middleUploads = multiparty({ uploadDir: "./uploads" });

const api = express.Router();

api.post("/register", userController.registerUser);
api.post("/login", userController.loginUser);
api.get("/protected", middleAuthen.authUser, userController.protectedRoute);
api.put("/upload-avatar/:id", middleAuthen.authUser, middleUploads, userController.uploadAvatar);//put con body multipart file
api.get("/avatar/:avatarName", userController.getAvatar);

module.exports = api;