"use strict";

const jwt = require('jsonwebtoken');
const config = require('../config');

//Exportamos un middleware de autenticacion
module.exports = function(req, res, next){
    //Recoger el token jwt
    const token = req.body.token || req.query.token || req.get('x-access-token');

    //Si no me llega token responder no autorizado
    if(!token){
        const error = new Error('Necesitas el token de autenticacion');
        error.status = 401;
        next(error);
        return;
    }

    //Validar el token
    jwt.verify(token, config.jwtSecret, (err, tokenDecodificado) => {
        //Si el token ha sido modificado o expirado nos dara este error
        if(err){
            const error = new Error('El token no es válido');
            error.status = 401;
            next(error);
            return;
        }
        //El token es correcto
        req.usuario_id = tokenDecodificado.usuario_id;
        next();
    });
};