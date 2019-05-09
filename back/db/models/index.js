const Product = require('./Product');
const User = require('./User');
const Order = require('./Order');
const Grape = require('./Grape');
const Cellar = require('./Cellar');
const Line = require('./Line');
const Precio= require('./Precio');
const Elaboracion= require('./Elaboracion');
const OrderProduct= require('./OrderProduct')

// Relaciones entre las diferentes tablas, por ejemplo:
// tenemos Order como source, y User como target,
// esto nos crea una tabla intermedia llamada 'user_order' que va contener los userId y 
// los orderId de los elementos relacionados.

// Relación entre bodegas y vinos. Una bodega podrá tener muchos vinos pero un vino solo pertenecerá a una bodega.
Cellar.hasMany(Product, { as:'Product' });
Product.belongsTo(Cellar);

// Relación entre bodegas y lineas. Una bodega tendrá muchas líneas, pero una línea solo pertenecerá a una bodega.
Cellar.hasMany(Line, { as:'Line' });
Line.belongsTo(Cellar);

// Relación entre usuarios y ordenes. Un usuario tendrá muchas ordenes, pero una orden solo pertenecerá a un usuario.
User.hasMany(Order, { as:'Order' });
Order.belongsTo(User);

// Relación entre ordenes y productos. Una orden tendrá muchos productos y a la vez, un producto podrá estar en muchas ordenes.
Order.belongsToMany(Product, {through:OrderProduct})
Product.belongsToMany(Order, {through:OrderProduct})

// Relación entre líneas y productos. Una línea tendrá muchos productos, pero un producto solo pertenecerá a una línea.
Line.hasMany(Product, { as:'Product' });
Product.belongsTo(Line);

// Relación entre años y productos. Un año tendrá muchos productos, pero un producto solo pertenecerá a un año.
Elaboracion.hasMany(Product, { as:'Product' });
Product.belongsTo(Elaboracion);

// Relación entre precios y productos. Un precio tendrá muchos productos, pero un producto solo pertenecerá a un precio.
Precio.hasMany(Product, { as:'Product' });
Product.belongsTo(Precio);

// Relación entre productos y uvas. Un producto tendrá muchas uvas y a la vez, una uva podrá tener muchos vinos.
Product.belongsToMany(Grape, { through:'product_grape' });
Grape.belongsToMany(Product, { through:'product_grape' });

// Relación entre bodegas y uvas. Una bodega tendrá muchas uvas.
Cellar.belongsToMany(Grape, { through:'cellar_grape' });
// Relación entre bodegas y fechas de elaboración. Una bodega tendrá muchas fechas de elaboración.
Cellar.belongsToMany(Elaboracion, { through:'cellar_elab' });


module.exports = {
  User,
	Order,
	Product,
	Line,
	Grape,
	Cellar,
	Elaboracion,
	Precio,
	OrderProduct
};

