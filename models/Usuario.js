"use strict";

const mongoose = require('mongoose');

//Creamos un esquema
var usuarioSchema = mongoose.Schema({
    nombre: String,
    email: String,
    clave: String
});

var Usuario = mongoose.model('Usuari', usuarioSchema);