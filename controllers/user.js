const bcryptjs = require('bcryptjs');
const User = require("../models/user");

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

module.exports = { registerUser };