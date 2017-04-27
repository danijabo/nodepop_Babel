"use strict";

const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

//Le pedimos a mongoose el modelo de Anuncio
const Anuncio = mongoose.model('Anuncio');

//GET /apiv1/anuncios
router.get('/', (req, res, next) => {
    //console.log('Usuario autenticado con _id: ', req.usuario_id)

    //Recogemos parametros de busqueda
    const nombre = req.query.name;
    const precio = req.query.precio;
    const venta = req.query.venta;
    const foto = req.query.foto;
    const tags = req.query.tags;
    const limit = parseInt(req.query.limit);
    const skip = parseInt(req.query.skip);
    const select = req.query.select;
    const sort = req.query.sort;

    const criterios = {};

    //Si nombre no tiene nada no me interesa filtrar
    if(nombre){
        criterios.name = name;
    }

    if(precio){
        criterios.precio = precio;
    }

    if(venta){
        criterios.venta = true;
    }

    if(tags){
        criterios.tags = tags;
    }

    //Recuperamos una lista de anuncios
    Anuncio.list(criterios, 0, 0, 0, 0, (err, anuncios) =>{
        if(err){
            next(err);
            return;
        }
        res.json({success: true, result: anuncios});
    });
});

//GET /apiv1/anuncios/:id
router.get('/:id', (req, res, next) => {
    const _id = req.params.id;
    Anuncio.findOne({_id: _id}).exec((err, anuncio) => {
        if(err){
            next(err);
            return;
        }
        res.json({success: true, result: anuncio});
    });
});

//POST /apiv1/anuncios
router.post('/', (req, res, next) => {
    const datosAnuncio = req.body;

    //Creo instancia de anuncio
    const anuncio = new Anuncio(datosAnuncio);

    //Guardo mi instancia en la base de datos
    anuncio.save((err, anuncioGuardado) => {
        if(err){
            next(err);
            return;
        }
        res.json({success: true, result: anuncioGuardado});
    });
});

//PUT /apiv1/anuncios/:id
router.put('/:id', (req, res, next) => {
    const datosAnuncio = req.body;
    const _id = req.params.id;

    Anuncio.update({_id: _id}, datosAnuncio, (err) => {
        if(err){
            next(err);
            return;
        }
        res.json({success: true})
    });
});

//DELETE /apiv1/anuncios/:id
router.delete('/:id', (req, res, next) => {
    const _id = req.params.id;

    Anuncio.remove({_id: _id}, err => {
        if(err){
            next(err);
            return;
        }
        res.json({success: true});
    });
});

module.exports = router;