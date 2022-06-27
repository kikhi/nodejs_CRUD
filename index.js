'use strict'

// Importamos modulos
const express = require('express');
const mongoose = require('mongoose');
const config = require('./config')
const hbs = require('express-handlebars');
const router = require('./routers/routes')

const app = express();

// Body Parse
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//Router our app
app.use('/', router);
app.use('/static', express.static('public'))

// Motor hbs de vistas
app.engine('.hbs', hbs({
    defaultLayout: 'index',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//Conexion a la Base de Datos
mongoose.connect(config.db, config.urlParser, (err, res) => {
    if(err) {
        return console.log(`Error al conectar en la Base de Datos ${err}`);
    }

    console.log(`Conexión a la Base de Datos Exitosa`)

    app.listen(config.port, () => {
        console.log(`Ejecutando en https://localhost:${config.port}`) 
    })
})

/*    Instalamos Express    */
// npm i express

/*    Inicialisamos el proyecto    */
// npm init