const fs = require('fs');
const jwt = require('jsonwebtoken');

const SECRET = fs.readFileSync('private.key');
const EXPIRATION = "1d";

function createJWT(pseudo) {
    return jwt.sign({ pseudo }, SECRET, { expiresIn: EXPIRATION });
}

function checkTokenMiddleware(req, res, next) {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Token manquant ou invalide" });
    }

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Token invalide" });
        }

        req.user = decoded; 
        next();
    });
}

module.exports = { createJWT, checkTokenMiddleware };
