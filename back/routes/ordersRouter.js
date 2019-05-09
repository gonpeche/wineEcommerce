const express= require('express');
const router= express();
const nodemailer = require('nodemailer');
const config = require('../config/smtp.json');

const { Order, OrderProduct, Product, Cellar, Line }=require('../db/models/index')

// Ruta que se encarga de enviar el mail de confirmación de compra al administrador.
router.post('/email', (req,res) => {
	var total= 0;
	var data= req.body.order.products.map(product => {
			total += product.product.price * product.cantidad;
			 return Cellar.findById(product.product.cellarId)
			.then(data => {
				var cellar= data.dataValues.cellarName;
				return Line.findById(product.product.lineId)
					.then(data => {
						var line= data.dataValues.lineName;
						return {
							id: product.product.id,
							name: product.product.productName,
							cellar: cellar,
							line: line,
							year: product.product.year,
							price: product.product.price,
							quantity: product.cantidad,
							subtotal: product.cantidad * product.product.price
						}
					})
			})
			.catch(e => console.log(e)) 
	})

	Promise.all(data).then(data =>	{
		// Esto va a ser el contentido del mail con los datos de la venta:
		var productInfo= data.map(e => {
			return [
				'ID de producto: ' + e.id,
				'\nNombre de producto: ' + e.name,
				'\nNombre de bodega: ' + e.cellar,
				'\nNombre de línea: ' + e.line,
				'\nAño de elaboración: ' + e.year,
				'\nPrecio unitario: $' + e.price,
				'\nCantidad de unidades: ' + e.quantity,
				'\nSubtotal: $' + e.subtotal,
				'\n_____________________________\n'
			]
		})		

		let mailOptions = {
			from : config.mailOptions.from,
			to : config.mailOptions.to,
			subject : config.mailOptions.subject,
			text: [
				'	Datos del comprador\n'
				+ '- - - - - - - - - - - - - - - - - - - - - - - - - -'
				+ '\n	ID de usuario: ' + req.body.user.id
				+ '\n	Nombre de usuario: '+ req.body.user.firstName + ' ' + req.body.user.lastName
				+ '\n	Email: ' + req.body.user.email
				+ '\n	Telefono: ' + req.body.user.telefono
				+ '\n	Domicilio: ' + req.body.user.domicilio
				+ '\n	Ciudad: ' + req.body.user.ciudad
				+ '\n	Provincia: ' + req.body.user.provincia + '\n'	
				+ '- - - - - - - - - - - - - - - - - - - - - - - - - -\n'
				+ 'Productos: \n' + productInfo.join('')
				+ '\n Total: $' + total].join('')
		}

		let transporter = nodemailer.createTransport({
			host : config.smtp.host,
			port : config.smtp.port,
			secure : config.smtp.secure,
			auth : {
				user : config.smtp.auth.user,
				pass : config.smtp.auth.pass
			}
		});

		transporter.sendMail(mailOptions);
	})
	res.sendStatus(200);
});


// Ruta que nos devuelve el carrito de un usuario.
router.get('/cart/:userId', function(req, res){
	var productsCart = [];
	Order.findOrCreate({
		where:{
			userId: req.params.userId,
			status :"creada",
		}
	})
		
	.then(order => {
		return order[0].update({
			ref : req.params.userId +'-'+ order[0].dataValues.id 
		})
	})

	.then(data => data.dataValues)
	.then(order => {
		OrderProduct.findAll({
			where : {
				orderId : order.id
			}
		})
			.then(data => data.map(e => { 
				return {
					cantidad : e.dataValues.cantidad, 
					productId : e.dataValues.productId
				} 
			}))
			.then(prods => {
				var arr = [];
				for (var i=0; i < prods.length; i++){
					var product = Product.findById(prods[i].productId);
					arr.push(product);
					productsCart.push({
						id : prods[i].productId,
						cantidad : prods[i].cantidad
					})
				}
				Promise.all(arr)
					.then(data => {
						var products = data.map((e,i) => {
							if(productsCart[i].id == e.id){
								return {
									cantidad : productsCart[i].cantidad,
									product : e
								}
							}
						})
						res.send(products);
					})	
			})
	})
})  

// Ruta para agregar un producto a una orden, o crear esta ultima si no existe.
router.post('/add-product', function(req, res){
	// Necesita ID PRODUCTO, ID ORDEN
	// Se fija si existe el producto en la orden
	// Si no existe lo crea con deafult 1
	// Si existe agrega cantidad++
	// ProductID y OrderID se usan 2 veces con los mismos valores

	Order.findOrCreate({
		where:{
			status: "creada",
			userId: req.body.userId
		}
	})
	.then(data=> data[0].dataValues)
	.then(order=> {
		return OrderProduct.findOrCreate({
			where : {
				orderId : order.id, 
				productId : req.body.productId
			},
			defaults : {
				cantidad : 1
			}
		})
		.then(data=>{
			if(!data[1]){
				data[0].cantidad++
				OrderProduct.update({
					cantidad : data[0].cantidad++ 
					},{
						where : {     
							orderId: order.id, 
							productId: req.body.productId  
						}
					}
				) 
			} 
		})
	})
		.then(data=> res.send(data))
})

// Ruta para eliminar una unidad del producto en una orden.
router.post('/less-product', function(req, res){
	Order.findAll({
		where:{
			status: "creada",
			userId: req.body.userId
		}
	})
		.then(data => data[0].dataValues)
		.then(order => {	
			OrderProduct.findOne({
				where : {
					orderId: order.id, 
					productId:req.body.productId
				},
			})
				.then(data=>{
					if(data.cantidad){
						OrderProduct.update({
							cantidad : data.cantidad-1 
						},{
							where : {     
								orderId: order.id, 
								productId:req.body.productId  
							}
						})
					}else{
						OrderProduct.destroy({
							where : {
								orderId: order.id, 
								productId:req.body.productId
							}
						})
					}
				})
		})
	.then(data=> res.send(data))
})

// Ruta para eliminar todas las unidades de un producto en una orden.
router.post('/remove-product', function(req, res){
	OrderProduct.findOne({
		where : {
			productId : req.body.productId
		}
	})
		.then(product => product.destroy())
		.then(data => res.send(data))
		.catch(e => res.send(e))
})

// Ruta para vaciar el carrito y eliminar todos los productos de una orden.
router.post('/remove-order', function(req, res){
	Order.findOne({
		where:{
			status: "creada",
			userId: req.body.userId
		}
	})
	.then(order => order.destroy())
	.catch(e => console.log(e))
})

// Ruta para modificar el status de una orden.
router.put('/:orderId', (req,res) => {
	Order.findById(req.params.orderId)
		.then(data => data.update(req.body))
		.then(() => res.sendStatus(201))
		.catch(e => console.log(e))
});

// Ruta que nos devuelve todas las ordenes.
router.get('/', (req,res) => {
	Order.findAll({})
		.then(data => res.send(data))
});

module.exports= router;

