const express= require('express');
const router= express();

const { Cellar }= require('../db/models/index');


// Ruta para eliminar una bodega de la base de datos.
router.post('/delete', (req,res) => {
	Cellar.findById(req.body.id)
		.then(data => data.destroy())
		.catch(e => console.log(e))
});

// Ruta para crear una nueva bodega en la base de datos.
router.post('/create', (req,res) => {
	Cellar.findOrCreate({
		where : {
			cellarName : req.body.value
		}
	})
		.then(data => res.send(data))
		.catch(e => console.log(e))
});

// Ruta que busca por ID y devuelve una bodega.
router.get('/:cellarId', (req,res) => {
	Cellar.findById(req.params.cellarId)
		.then(data => res.send(data))
		.catch(e => console.log(e))
});

// Ruta que devuelve todas las bodegas.
router.get('/', (req,res) => {
	Cellar.findAll({})
		.then(data => res.send(data))
		.catch(e => console.log(e))
});

module.exports= router;