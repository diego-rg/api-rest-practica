const express = require('express');
const helloController = require("../controllers/hello");//importamos os controladores para as nosas rutas

const api = express.Router();

api.get("/hello", helloController.getHello);//solo se manda a función, non leva ()

module.exports = api;