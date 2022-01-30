const express = require('express');
const userController = require('../controllers/user');

const api = express.Router();

api.post("/register", userController.registerUser);
api.post("/login", userController.loginUser);

module.exports = api;