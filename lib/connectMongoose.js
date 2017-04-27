"use strict";

const mongoose = require('mongoose');

//libreria de promesas
mongoose.Promise = global.Promise;

const conn = mongoose.connection;

conn.on('err', (err) => {
    console.log('Error de conexion', err);
    process.exit(1);
})
conn.once('open', () => {
    console.log('Conectado a MongoDB.')
});

//Realizamos la conexion
mongoose.connect('mongodb://localhost/nodepop_api');

//No necesitamos exportar la conexion ya que mongoose la gestiona por nosotros
//si utilizasemos el driver si que necesitariamos hacerlo