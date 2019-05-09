var db = require('../index');
const Sequelize = require('sequelize');

// Modelo ordenes. Será para uso del administrador.
const Order = db.define('order', {
    status: {
        type: Sequelize.ENUM('creada', 'cancelada', 'completada') // Agregar status : procesando,
    },
    date: {
        type: Sequelize.STRING,
    },
		ref: {
			type : Sequelize.STRING,
		}
});

module.exports = Order;
