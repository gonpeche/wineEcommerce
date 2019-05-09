const express= require('express');
const router= express();

var { Grape, Product }= require('../db/models/index');


// Ruta para borrar una uva de la base de datos.
router.post('/delete', (req,res) => {
	Grape.findById(req.body.id)
		.then(data => data.destroy())
		.catch(e => console.log(e))
});

// Ruta para crear una nueva uva en la base de datos.
router.post('/create', (req,res) => {
	Grape.findOrCreate({
		where : {
			grapeName : req.body.value
		}
	})
		.then(data => res.send(data))
		.catch(e => console.log(e))
});

// Ruta que nos devuelve todas las uvas que contenga el producto que viene por ID.
router.get('/:productID', (req,res) => {
	Product.findAll({
		where: { id:req.params.productID },
		include: [Grape]
	})
	.then(data => res.send(data[0]))
	.catch(e => console.log(e))
});

// Ruta que nos devuelve todas las uvas.
router.get('/', (req,res) => {
	Grape.findAll({})
		.then(data => res.send(data))
		.catch(e => console.log(e))
});

module.exports= router;


