"use strict";

const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

//Le pedimos a mongoose el modelo de Usuario
const Usuario = mongoose.model('Usuario');

const jwt = require('jsonwebtoken');
const config = require('../../config');

//GET /apiv1/usuarios
/*router.get('/', (req, res, next) => {
    const nombre = req.query.nombre;
    const email = req.query.email;
    const clave = req.query.clave;

    const limit = parseInt(req.query.limit);
    const skip = parseInt(req.query.skip);
    const select = req.query.select;
    const sort = req.query.sort;

    const criterios = {};

    if(nombre){
        criterios.nombre = nombre;
    }

    if(email){
        criterios.email = email;
    }

    if(clave){
        criterios.clave = clave;
    }

    Usuario.list(criterios, limit, skip, select, sort, (err, usuarios) => {
        if(err){
            next(err);
            return;
        }
        res.json({success: true, result: usuarios});
    });
});*/

//POST /apiv1/usuarios
router.post('/authenticate', (req, res, next) => {
    //Recibimos las credenciales
    const nombre = req.query.nombre;
    const email = req.query.email;
    const clave = req.query.clave;

    Usuario.findOne({email: email}).exec((err, usuario) => {
        if(err){
            next(err);
            return;
        }
        if(!usuario){
            res.json({success: false, error: 'Credenciales incorrectas'});
            return;
        }
        if(clave !== usuario.clave){
            res.json({seccess: false, error: 'Credenciales incorrectas'});
            return;
        }
        jwt.sign({usuario_id: usuario._id}, config.jwtSecret, config.jwtConfig,
        (err, token) => {
            if(err){
                next(err);
                return;
            }
            res.json({success: true, token: token});
        });
    });
});

module.exports = router;