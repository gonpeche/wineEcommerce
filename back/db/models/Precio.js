var db = require('../index');
const Sequelize = require('sequelize');

// Modelo precio. Lo usaremos para filtrar vinos por su precio.
const Precio = db.define('precio', {
	precio: {
		type: Sequelize.INTEGER,
	},
});

module.exports = Precio;