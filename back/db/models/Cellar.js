var db = require('../index'); 
const Sequelize = require('sequelize');

// Modelo para bodegas. No podrá ser null ya que por defecto formará parte del nombre del producto.
const Cellar = db.define('cellar', {
    cellarName: {
        type: Sequelize.STRING,
				allowNull: false
    },	
});

module.exports = Cellar;
