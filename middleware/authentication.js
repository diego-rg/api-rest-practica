const { unix } = require("moment");
const moment = require("moment");
const jwt = require("../services/jwt");

const secretKey = process.env.SECRET_KEY;

function authUser(req, res, next) {
    if(!req.headers.authorization){
        return res.status(403).send({ msg: "La petición no tiene cabecera de autenticación" })
    }

    //busca as ' que haxa no token e elimínaas
    const token = req.headers.authorization.replace(/['"]+/g, "");

    try {
        const payload = jwt.decodeToken(token, secretKey);

        //comprobar se o token expirou con moment
        if (payload.exp <= moment().unix()) {
            return res.status(401).send({ msg: "El token ha expirado" });
        }
    } catch (error) {
        res.status(401).send({ msg: "Token inválido" });
    }
    req.user = payload;
    next();
}

module.exports = { authUser };