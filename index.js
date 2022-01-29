if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const mongoose = require('mongoose');
const app = require('./app');//cargamos app.js que une rutas e controladores
const PORT = process.env.PORT || 3000;;//iniciamos o server en PORT. En producción PORT irá en .env (ej: const PORT = process.env.PORT || 3000;)
const urlMongo = process.env.URL_MONGO;

mongoose.connect(urlMongo, (err, res) => {
    try {
        if(err) {
            throw err;
        } else {
            console.log("Conexión exitosa a la base de datos.");
            app.listen(PORT, () => {
                console.log("Servidor de la API Rest funcionando");
            });
        }
    } catch (error) {
        console.log(error);
    }
});