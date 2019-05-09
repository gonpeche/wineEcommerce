var db = require('../index');
const Sequelize = require('sequelize');

// Modelo de fecha de elaboración. Lo usaremos para filtrar vinos por año.
const Elaboracion = db.define('elaboracion', {
	fecha: {
		type: Sequelize.STRING,
	},
});

module.exports = Elaboracion;
