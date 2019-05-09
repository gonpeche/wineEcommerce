var db = require('../index');
const Sequelize = require('sequelize');

// Modelo línea. Lo usaremos para filtrar vinos por esta categoría.
const Line = db.define('line', {
    lineName: {
        type: Sequelize.STRING,
				allowNull: false
    },
});

module.exports = Line;
