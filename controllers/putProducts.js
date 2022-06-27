// Trujillo Garay Cesar Andres

// INsertamos producto
const req = require("express/lib/request");
const Product = require("../models/product");

module.exports = (req, res) =>{
    let datoModificar = req.params.productId;
    let update = req.body;
    console.log(datoModificar);
    console.log(update);

    // Intercepta errores
    Product.findOneAndUpdate(datoModificar,update,(err,products)=>{
        if(err) return res.status(500).send({
            message: `Error al actualizar ${err}`
        });
        if(!products) return res.status(404).send({
            message: 'No se encontro el producto solicitado'
        });
        res.status(200).send({ product:datoModificar });
    });
};