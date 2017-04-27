"use strict";

const mongoose = require ('mongoose');

//Creamos un esquema
var anuncioSchema = mongoose.Schema({
    nombre: {
        type: String,
        unique: true
    },
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
});

anuncioSchema.statics.list = function(
    criterios, limit, skip, select, sort,
    callback) {
    const query = Anuncio.find(criterios);
    //Añado limites
    query.limit(limit);
    //Selecciona los n-x ultimos
    query.skip(skip);

    query.select(select);
    //Ordena
    query.sort(sort);
    //Ejecuto la query
    query.exec(callback);
}

var Anuncio = mongoose.model('Anuncio', anuncioSchema);