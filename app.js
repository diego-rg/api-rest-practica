const express = require('express');//Requerimos express e iniciamos a app
const app = express();

app.use(express.json());//para poder ver os body da requests en json
app.use(express.urlencoded({ extended: true }));

//requerimos as rutas
const helloRoutes = require("./routes/hello");
const taskRoutes = require("./routes/task");
const userRoutes = require("./routes/user");

//activamos as rutas, usando subruta api
app.use("/api", helloRoutes);
app.use("/api", taskRoutes);
app.use("/api", userRoutes);

module.exports = app;