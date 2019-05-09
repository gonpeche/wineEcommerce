var db = require('../index');
const Sequelize = require('sequelize');

// Modelo producto. Será el que contendrá la información de cada producto cargado en la base de datos.
const Product = db.define('product', {
    productName: {
			type: Sequelize.STRING,
			validate : {
				notEmpty : true
			}
    },
    year: {
      type: Sequelize.STRING,
    },
    stock: {
			type: Sequelize.INTEGER,
			validate : {
				notEmpty : true
			}    
		},
    price: {
			type: Sequelize.INTEGER,
			validate : {
				notEmpty : true
			}
    },
    description: {
      type: Sequelize.TEXT,
    },
    image: {
      type: Sequelize.TEXT,
    }
});


module.exports = Product;
