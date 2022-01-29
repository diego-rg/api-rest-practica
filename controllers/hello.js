//Función equivalente a poñer todo xunto en index.js
function getHello (req, res) {
    res.status(200).send({
        msg: "Hola"
    });
}

module.exports = { getHello };