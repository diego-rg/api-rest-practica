const fs = require("fs");//librerias de node, solo importalas
const path = require("path");
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

function protectedRoute(req, res) {
    res.status(200).send({ msg: "Contenido de endpoint protegido" });
}

function uploadAvatar(req, res) {
    const params = req.params;
    User.findById({ _id: params.id }, (err, userData) => {
        if(err) {
            res.status(500).send({ msg: "Error del servidor" });
        } else {
            if(!userData) {
                res.status(404).send({ msg: "No se ha encontrado el usuario" });
            } else {
                let user = userData;
                if(req.files) {
                    const fileName = (req.files.avatar.path).substring(8);//quitamos o path uploads do string
                    const splitName = fileName.split(".");//dividimos o nome compelto nun array cona extensión e o nome
                    const fileExtension = splitName[1];

                    if(fileExtension !== "png" && fileExtension !== "jpg") {
                        res.status(400).send({ msg: "La extensión de la imagen debe ser png o jpg" });
                    } else {
                        user.avatar = fileName;

                        User.findByIdAndUpdate({ _id: params.id }, user, (err, userUpdated) =>{
                            if(err) {
                                res.status(500)-send({ msg: "Error del servidor" });
                            } else {
                                if(!userUpdated) {
                                    res.status(404).send({ msg: "No se ha poido encontrar el usuario" });
                                } else {
                                    res.status(200).send({ msg: "Avatar actualizado" });
                                }
                            }
                        })
                    }
                }
            }
        }
    });
}

function getAvatar (req, res) {
    const avatarName = req.params.avatarName;
    const filePath = `./uploads/${avatarName}`;

    fs.stat(filePath, (err, stat) =>{
        if(err) {
            res.status(400).send({ msg: "El avatar no existe" });
        } else {
            res.sendFile(path.resolve(filePath));
        }
    })
}

module.exports = { registerUser, loginUser, protectedRoute, uploadAvatar, getAvatar };