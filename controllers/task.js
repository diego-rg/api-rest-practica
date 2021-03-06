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
    const taskId = req.params.id; 
    try {
        const task = await Task.findById(taskId);
        if(!task) {
            res.status(400).send({ msg: "No se ha podido cargar la tarea" });
        } else {
            res.status(200).send(task);
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

//UPDATE
async function updateTask(req, res) {
    const taskId = req.params.id;
    const newData = req.body;
    try {
        const task = await Task.findByIdAndUpdate(taskId, newData);
        if(!task) {
            res.status(400).send({ msg: "No se ha podido modificar la tarea" });
        } else {
            res.status(200).send({ msg: "Tarea modificada correctamente" });
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

//DELETE
async function deleteTask(req, res) {
    const taskId = req.params.id;
    try {
        const task = await Task.findByIdAndDelete(taskId);
        if(!task) {
            res.status(400).send({ msg: "No se ha podido eliminar la tarea" });
        } else {
            res.status(200).send({ msg: "Tarea eliminada correctamente" });
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = { createTask, getTasks, getTask, updateTask, deleteTask };