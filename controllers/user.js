const bcryptjs = require('bcryptjs');
const User = require("../models/user");
const jwt = require("../services/jwt");//importamos as funcións creadas que usan jwt, non a dependencia

async function registerUser(req, res) {
    const user = new User(req.body);
    const { email, password } = req.body;
    try {
        if(!email) throw { msg: "El email es obligatorio" };//throw: provocamos error nesa condición
        if(!password) throw { msg: "La contraseña es obligatoria" };

        //revisar email no repetido
        const foundEmai = await User.findOne({ email });
        if(foundEmai) throw { msg: "El email introducido ya está en uso" };

        //password con bcryptjs
        const salt = bcryptjs.genSaltSync(10);
        user.password = await bcryptjs.hash(password, salt);
        user.save();
        res.status(200).send({ msg: "usuario creado correctamente" });
    } catch (error) {
        res.status(500).send(error);
    }
}

async function loginUser(req, res) {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if(!user) throw { msg: "Error al introducir el email o la contraseña" };

        //comparamos a password que puxo coa user.password do email que buscamos na db
        const checkPassword = await bcryptjs.compare(password, user.password);
        if(!checkPassword) throw { msg: "Error al introducir el email o la contraseña" };

        //mandamos como resposta a token de jwt
        //IMPORTANTE: os token jwt poden desencriptarse poñéndoos na súa web, polo que non deben conter información importante
        res.status(200).send({ token: jwt.createToken(user, "12h") });
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = { registerUser, loginUser };