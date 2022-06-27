// Trujillo Garay Cesar Andres
const Product = require("../models/product");


// Eliminamos producto
module.exports = (req, res) => {
    let datoBusqueda = req.params.productId;

    // Interceptar errores
    Product.findById(datoBusqueda, (err, product) => {
        if (err) return res.status(500).send({
            message: `Error al borrar ${err}`
        });
        product.remove(err => { 
            if (err) return res.status(500).send({
                message: `Error al borrar  ${err}`
            });
            res.status(200).send({
                message: `Producto eliminado`
            });
        });
    });
};