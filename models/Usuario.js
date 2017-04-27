"use strict";

const mongoose = require('mongoose');

//Creamos un esquema
var usuarioSchema = mongoose.Schema({
    nombre: String,
    email: {
        type: String,
        index: true,
        unique:true
    },
    clave: String
});

/*usuarioSchema.statics.list = function(
    criterios, limit, skip, select, sort,
    callback) {
    const query = Usuario.find(criterios);
    //Añado limites
    query.limit(limit);
    //Selecciona los n-x ultimos
    query.skip(skip);

    query.select(select);
    //Ordena
    query.sort(sort);
    //Ejecuto la query
    query.exec(callback);
    }*/

var Usuario = mongoose.model('Usuario', usuarioSchema);