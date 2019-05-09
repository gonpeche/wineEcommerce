const express= require('express');
const router= express();

const { Line }= require('../db/models/index');


// Ruta para eliminar una linea de la base de datos.
router.post('/delete', (req,res) => {
	Line.findById(req.body.id)
		.then(data => data.destroy())
		.catch(e => console.log(e))
});

// Ruta para crear una nueva linea en la base de datos.
router.post('/create', (req,res) => {
	Line.findOrCreate({
		where : {
			lineName : req.body.value
		}
	})
		.then(data => res.send(data))
		.catch(e => console.log(e))
});

// Ruta que busca por ID y nos devuelve una linea.
router.get('/:lineId', (req,res) => {
	Line.findById(req.params.lineId)
		.then(data => res.send(data))
		.catch(e => console.log(e))
});

// Ruta que nos devuelve todas las lineas.
router.get('/', (req,res) => {
	Line.findAll({})
		.then(data => res.send(data))
		.catch(e => console.log(e))
});

module.exports= router;