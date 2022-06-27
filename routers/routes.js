//Import Modules
const express = require('Express');
const Product = require('../models/product')
const path = require('path');

//Create a Router Object
const router = express.Router();

//Export our Router
module.exports = router;

// Render de paginas
router.get('/', (req,res) => {
    res.render('home');
});

router.get('/InsertProduct', (req, res) => {
    res.render('product');
})

router.get('/login', (req,res) => {
    res.status(200).send('Pagina login');
});

//Insertar Valores en la Base de Datos
router.post('/api/product', (req, res) =>{
    let product = new Product();
    product.name = req.body.name;
    product.picture = req.body.picture;
    product.price = req.body.price;
    product.category = (req.body.category).toLowerCase();
    product.description = req.body.description;
    
    console.log(req.body);
    
    product.save((err, productStored) =>{
    if (err) return res.status(500).send ({
        message: `Error al realizar la peticion ${err}`
    });
    res.redirect('/api/product');
    });
});

// Consultas
router.get('/api/product/:datoBusqueda', (req,res) => {

    let datoBusqueda = req.params.datoBusqueda;

    Product.findById(datoBusqueda, (err, products) => { 
        if(err) return res.status(500).send({
            message: `Error al realizar la peticion ${err}`
        });
        if(!products) return res.status(404).send({
            message: 'El producto no existe'
        });
        res.status(200).send({product:products});
    }).lean();
});

router.get('/api/product', (req,res) => {

    Product.find({}, (err,products) => {
        if(err) return res.status(500).send({
            message: `Error al realizar la peticion ${err}`
        });
        if(!products) return res.status(404).send({
            message: 'No existen productos'
        });
        res.render('showproducts', { products });
    }).lean();
});

// Insertar valor DB
const putProduct = require("../controllers/putProducts");
router.put('/api/product/:productId', putProduct);

// Borra valores DB
const delProduct = require('../controllers/delProducts');
router.delete('/api/product/:productId', delProduct);

router.use((req,res) => {
    res.status(404).send('Pagina no encontrada');
});
