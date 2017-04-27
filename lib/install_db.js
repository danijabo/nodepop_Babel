"use strict";

const mongoose = require('mongoose');

require('./connectMongoose');
const fs = require('fs'); //cargar libreria fileSistem
const path = require('path');

require('../models/Anuncio');
//require('../models/Usuario');

const Anuncio = mongoose.model('Anuncio');
//const Usuario = mongoose.model('Usuario');

function iniciarBd() {
    const fichero = path.join('./lib/anuncios.json');

    fs.readFile(fichero, 'utf-8', function (err, datos) {
        if (err) {
            console.log(err);
            return;
        }
        const json = JSON.parse(datos);

        //console.log(datos);

        /*borrarUsuarios(function(err){
            if(err){
                console.log('No se han borrado los usuarios');
                return;
            }
        });*/
        //borrarUsuarios()
        // .then((res))
        borrarAnuncios()
            .then((res) => {
                console.log(res);
                return insertarAnuncios(json);
            }).then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log('Error', err);
            }).then(() => {
                mongoose.connection.close();
            });
    });
}

iniciarBd();

function borrarUsuarios() {
    return new Promise((resolve, reject) => {
        Usuario.remove({}, function (err) {
            if (err) {
                reject('Fallo al borrar usuarios');
                return;
            }
            resolve('Usuarios borrados');
        });
    });
}

function borrarAnuncios() {
    return new Promise((resolve, reject) => {
        Anuncio.remove({}, function (err) {
            if (err) {
                reject('Fallo al borrar anuncios');
                return;
            }
            resolve('Anuncios borrados');
        });
    });
}

function insertarAnuncios(json) {
    return new Promise((resolve, reject) => {
        const anuncios = json.anuncios;
        anuncios.forEach((elem) => {
            const anuncio = new Anuncio(elem);
            anuncio.save((err, anuncioInsertado) => {
                if (err) {
                    reject(err);
                    return;
                }
                console.log('anuncio insertados con _id: ', anuncioInsertado._id);
            });
        });
            resolve('Anuncios insertados');

    });
}

function insertarUsuarios(json) {
    return new Promise((resolve, reject) => {
        const usuarios = json.usuarios;
        usuarios.forEach((elem) => {
            usuarios.save((err, usuarioInsertado) => {
                if (err) {
                    reject(err);
                    return;
                }
                console.log('usuario insertado con _id: ', usuarioInsertado._id);
            });
        });
        resolve('Usuarios insertados');
    });
}