const express = require('express');
const taskController = require("../controllers/task");

const api = express.Router();

api.post("/task", taskController.createTask);//chamamos a función de crear tarea dese controlador
api.get("/task", taskController.getTasks);//diferente método, polo que nome pode ser o mismo, xa que será unha ruta diferente
api.get("/task/:id", taskController.getTask);
api.put("/task/:id", taskController.updateTask);

module.exports = api;