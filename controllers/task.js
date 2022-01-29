const Task = require("../models/task");

//CREATE
async function createTask(req, res) {
    const task = new Task();
    const params = req.body;
    task.name = params.name;
    task.description = params.description;
    try {//En caso de erro reponde status(500)
        const taskStore = await task.save();//función save de mongoose. Await a que garde
        if(!taskStore) {
            res.status(400).send({ msg: "No se ha podido guardar la tarea" });//Se non consigue gardar
        } else {
            res.status(200).send({ task: taskStore });//Se vai todo ben e garda
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

//SHOW
async function getTasks(req, res) {
    try {
        const tasks = await Task.find({ completed: false }).sort({ created: -1 });//buscamos as tareas que están pendientes e ordenamoos resultado polas máis recentes
        if(!tasks) {
            res.status(400).send({ msg: "No se han podido cargar las tareas" });
        } else {
            res.status(200).send({ tasks });//mandamos as tareas
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

//SHOW
async function getTask(req, res) {
    try {
        const tasks = await Task.find({  }).sort({ created: -1 });
        if(!tasks) {
            res.status(400).send({ msg: "No se han podido carga la tarea" });
        } else {
            res.status(200).send({ tasks });
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = { createTask, getTasks, getTask };