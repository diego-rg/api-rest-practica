const express = require('express');//Requerimos express e iniciamos a app
const app = express();

app.use(express.json());//para poder ver os body da requests en json
app.use(express.urlencoded({ extended: true }));

const helloRoutes = require("./routes/hello");//requerimos as rutas
const taskRoutes = require("./routes/task");

app.use("/api", helloRoutes);//usamos as rutas dende a subruta /api/
app.use("/api", taskRoutes);

module.exports = app;