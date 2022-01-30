const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY;//creamos a key para jwt

//crea o token con jwt
function createToken(user, expiresIn) {
    const { id, email } = user;
    const payload = { id, email };
    return jwt.sign(payload, secretKey, { expiresIn });
}

//usamos o token
function decodeToken(token) {
    return jwt.decode(token, secretKey);
}

module.exports = { createToken, decodeToken };