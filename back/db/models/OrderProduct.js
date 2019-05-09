var db = require('../index');
const Sequelize = require('sequelize');

// Modelo que relaciona una orden a un producto, definiendo un campo cantidad relacionado a la cantidad unitaria de cada producto.
const OrderProduct = db.define('orderProduct', {
    cantidad: {
        type: Sequelize.INTEGER,
    },
   
});
module.exports = OrderProduct;
