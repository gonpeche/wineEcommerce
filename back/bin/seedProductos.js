const {User, Product, Line, Grape, Cellar, Order, Elaboracion, Precio }= require('../db/models/index');

var cellar= [
'Alto Cedro',
'Andeluna',
'Antonio Mas',
'Antucura',
'Bodega del Desierto',
'Bressia',
'Callejón del Crimen',
'Carinae',
'Carmelo Patti',
'Casarena',
'Chakana',
'Cicchitti',
'Colomé',
'Concha y Toro',
'Cuarto Dominio',
'Domaine Alma Negra',
'Durigutti',
'El Esteco',
'Enrique Foster',
'Ernesto Catena',
'Escorihuela Gascón',
'Etchart',
'Gauchezco',
'Huarpe',
'Humberto Canale',
'La Rural',
'Laderas de los Andes',
'Mairena',
'Marcelo Pelleriti',
'Marchiori & Barraud',
'Masi Tupungato',
'Mauricio Lorca',
'Melipal',
'Mendel',
'Miras',
'Mosquita Muerta',
'O. Fournier',
'Riglos',
'Salentein',
'Siesta en el Tahuan',
'Stella Crinita',
'Tikal',
'Viña Cobos',
'Vistalba',
'Yacochuya',
'Zorzal Wines'
]

var line= [
'La Consulta Select',
'Altitud',
'Single Vineyards',
'Barrandica',
'Blend Selection',
'Cherie',
'Grand Vin',
'Pink',
'Single Vineyard Pukara',
'Single Vineyard Tani',
'Single Vinyards Yepun',
'Desierto 25',
'Monteagrelo',
'Piel Negra',
'Profundo',
'Gran Reserva',
'Harmonie',
'Jamillas Vineyard Perdriel',
'Laurens Vineyard Agrelo',
'Ayni',
'Estate Selection',
'Nuna Estate',
'Primmo',
'Estate',
'Casillero del Diablo',
'Tolentino Winemakers Selection',
'Quality Wines',
'Finca Castro Barros',
'Finca Los Altepes',
'Finca Los Barrancos',
'Reserva',
'Aruma',
'Pequeñas Producciones',
'Gran Linaje',
'Oro',
'Reserve',
'Agrelo Terroir',
'Gualtallary Terroir',
'Guayquil El Elegido',
'Taymente',
'Vista Flores Terroir',
'State',
'Rutini',
'Estate Bottled',
'Cuartel Dos',
'Corbec',
'Passo Blanco',
'Passo Doble',
'Fantasía',
'Ópalo',
'Poético',
'Nazarenas Vineyard',
'Lunta',
'Jovem',
'Blend de Tintas',
'B Crux',
'Gran Blend',
'Gran Cabernet Franc',
'Gran Cabernet Sauvignon',
'Gran Malbec',
'Quinto',
'Numina',
'Mara',
'Amici Miei',
'Amorío',
'Jubilo',
'Patriota',
'Bramare Luján de Cuyo',
'Corte B',
'Tomero Reserva',
'Michel Roland',
'San Pedro de Yacochuya',
'Eggo Tinto de Tiza'
]

var grape= [
'Blend',
'Malbec',
'Malbec Selection',
'Pinot Noir',
'Pinot Noir Rose',
'Cabernet Sauvignon',
'Cabernet Franc',
'Petit Verdot',
'Syrah',
'Torrontés',
'Blend Blanco',
'Blend Tinto',
'Bonarda',
'Chardonnay',
'Malbec Rosé',
'Sauvignon Blanc',
'Viognier',
'Blend de Malbec',
'Bobal',
'Monastrell'
]

var images = [
	' https://tonelprivado.vteximg.com.br/arquivos/ids/165309-1000-1000/Altocedro-Gran-Reserva-750-ml-Malbec-300264.jpg?v=635774868271300000',
	' https://tonelprivado.vteximg.com.br/arquivos/ids/171727-1000-1000/Andeluna-Pasionado-De-4-Cepas-.-Blend-.-750-ml-115014.jpg?v=636162801043000000',
	'https://http2.mlstatic.com/vino-antonio-mas-malbec-single-vineyard-D_NQ_NP_765608-MLA25844627628_082017-F.jpg',
	'https://tonelprivado.vteximg.com.br/arquivos/ids/158139-445-445/Barrandica-117072.jpg?v=635460668107930000',
	'http://www.bodegadeldesierto.com.ar/wp-content/uploads/2015/12/Desierto-Pampa__malbec_2013_.jpg',
	'https://www.espaciovino.com.ar/media/default/0001/54/thumb_53088_default_medium.jpeg',
	'https://www.espaciovino.com.ar/media/default/0001/59/thumb_58380_default_medium.jpeg',
	'https://www.espaciovino.com.ar/media/default/0001/56/thumb_55658_default_medium.jpeg',
	'https://http2.mlstatic.com/S_217021-MLA20685842313_042016-O.jpg',
	'https://http2.mlstatic.com/casarena-dna-malbec-vino-tinto-lujan-de-cuyo-mendoza-D_NQ_NP_772801-MLA20396277095_082015-F.jpg',
	'https://www.espaciovino.com.ar/media/default/0001/56/thumb_55732_default_medium.jpeg',
	'https://http2.mlstatic.com/vino-cicchitti-gran-reserva-malbec-bodega-cicchitti-D_NQ_NP_849811-MLA26664298809_012018-F.jpg',
	'https://www.espaciovino.com.ar/media/default/0001/59/thumb_58290_default_medium.jpeg',
	'https://super.walmart.com.mx/images/product-images/img_large/00780432063700L.jpg',
	'https://www.espaciovino.com.ar/media/default/0001/57/thumb_56782_default_medium.jpeg',
	'https://www.espaciovino.com.ar/media/default/0001/55/thumb_54243_default_medium.jpeg',
	'https://www.espaciovino.com.ar/media/default/0001/55/thumb_54294_default_medium.jpeg',
	'https://www.espaciovino.com.ar/media/default/0001/57/thumb_56044_default_medium.jpeg',
	'https://http2.mlstatic.com/vino-foster-reserva-bonarda-bodega-enrique-foster-D_NQ_NP_780884-MLA26664317610_012018-F.jpg',
	'https://www.espaciovino.com.ar/media/default/0001/53/thumb_52910_default_medium.jpeg',
]

var años= ['2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2017',];
var order= ['creada', 'cancelada', 'completada'];



const user= User.create({
	firstName : 'Pogo',
	lastName : 'Perez',
	email : 'pogoperez@gmail.com',
	// phone : 1122124424,
	password : 'holapogo',
	access : 5
});

var creationPromises = [];
for (var i=0; i < 20; i++){
	const prodProm = Product.create({
		productName : cellar[i] + ' - ' + line[i],
		bodega: cellar[i],
		year : años[i],
		stock : 4 + i*3,
		price : 100 + i*14,
		description : 'Este vino refleja la pasión por crear grandes vinos en una de las mejores regiones del 			mundo para cultivar Malbec: La Consulta en el Valle de Uco. Las uvas fueron cuidadosamente seleccionadas 	de viñas maduras (7 a 49 años de edad), fermentadas en pequeñas vasijas de concreto y 30 % del vino fue 	añejado 8 meses en barricas de roble francés para obtener una concentración balanceada de color, aromas, 	y sabores a frutas',
		image : images[i]

	});
	const cellarProm = Cellar.create({
		cellarName : cellar[i]
	});
	const grapeProm = Grape.create({
		grapeName : grape[i]
	});
	const lineProm = Line.create({
		lineName : line[i]
	});
	const orderProm = Order.create({
		status : order[Math.floor(Math.random() * 3)],
		date : '24/12/2018',
		// importe : 45 * (i+1),
		// address : 'calle falsa ' + i*11,
		// phone : '11210232'+i*10
	});
	const elabProm= Elaboracion.create({
		fecha: años[i]
	});
	const priceProm= Precio.create({
		precio: 28*(i+1)
	});
	creationPromises.push(elabProm, priceProm, user, prodProm, cellarProm, lineProm, orderProm, grapeProm);
}



Promise.all(creationPromises).then(elements => {
	var users= [];
	var products= [];
	var cellars= [];
	var lines= [];
	var orders= [];
	var grapes= [];
	var years= [];
	var precios= [];
	elements.map(e => {
		e.firstName && users.push(e);
		e.productName && products.push(e);
		e.cellarName && cellars.push(e);
		e.lineName && lines.push(e);
		e.status && orders.push(e);
		e.grapeName && grapes.push(e);
		e.fecha && years.push(e);
		e.precio && precios.push(e);
	})

	// Relacion entre productos y precios:
	precios[0].setProduct(products[19])
	.then(data => precios[1].addProduct(products[0]))
	.then(data => precios[2].addProduct(products[1]))
	.then(data => precios[3].addProduct(products[2]))
	.then(data => precios[3].addProduct(products[3]))
	.then(data => precios[4].addProduct(products[4]))
	.then(data => precios[3].addProduct(products[5]))
	.then(data => precios[2].addProduct(products[6]))
	.then(data => precios[5].addProduct(products[7]))
	.then(data => precios[7].addProduct(products[8]))
	.then(data => precios[7].addProduct(products[9]))
	.then(data => precios[8].addProduct(products[10]))
	.then(data => precios[9].addProduct(products[11]))
	.then(data => precios[10].addProduct(products[12]))
	.then(data => precios[11].addProduct(products[13]))
	.then(data => precios[7].addProduct(products[14]))
	.then(data => precios[8].addProduct(products[15]))
	.then(data => precios[9].addProduct(products[16]))
	.then(data => precios[10].addProduct(products[17]))
	.then(data => precios[11].addProduct(products[18]))

	// Relacion entre bodegas y fecha de elaboracion:
	.then(data => cellars[0].addElaboracion(years[0]))
	.then(data => cellars[1].addElaboracion(years[0]))
	.then(data => cellars[2].addElaboracion(years[1]))
	.then(data => cellars[3].addElaboracion(years[1]))
	.then(data => cellars[3].addElaboracion(years[2]))
	.then(data => cellars[4].addElaboracion(years[3]))
	.then(data => cellars[3].addElaboracion(years[3]))
	.then(data => cellars[2].addElaboracion(years[4]))
	.then(data => cellars[5].addElaboracion(years[4]))
	.then(data => cellars[7].addElaboracion(years[4]))
	.then(data => cellars[6].addElaboracion(years[5]))
	.then(data => cellars[8].addElaboracion(years[6]))
	.then(data => cellars[9].addElaboracion(years[7]))
	.then(data => cellars[10].addElaboracion(years[8]))
	.then(data => cellars[11].addElaboracion(years[9]))
	.then(data => cellars[12].addElaboracion(years[5]))
	.then(data => cellars[13].addElaboracion(years[6]))
	.then(data => cellars[14].addElaboracion(years[7]))
	.then(data => cellars[15].addElaboracion(years[8]))
	.then(data => cellars[16].addElaboracion(years[9]))
	.then(data => cellars[17].addElaboracion(years[5]))
	.then(data => cellars[18].addElaboracion(years[6]))
	.then(data => cellars[19].addElaboracion(years[7]))
	.then(data => cellars[10].addElaboracion(years[8]))
	.then(data => cellars[11].addElaboracion(years[9]))

	// Relacion entre productos y fechas de elaboracion:
	.then(data => years[0].addProduct(products[0]))
	.then(data => years[1].addProduct(products[1]))
	.then(data => years[2].addProduct(products[2]))
	.then(data => years[3].addProduct(products[3]))
	.then(data => years[3].addProduct(products[4]))
	.then(data => years[4].addProduct(products[5]))
	.then(data => years[3].addProduct(products[6]))
	.then(data => years[2].addProduct(products[7]))
	.then(data => years[5].addProduct(products[8]))
	.then(data => years[7].addProduct(products[9]))
	.then(data => years[7].addProduct(products[10]))
	.then(data => years[8].addProduct(products[11]))
	.then(data => years[9].addProduct(products[12]))
	.then(data => years[10].addProduct(products[13]))
	.then(data => years[11].addProduct(products[14]))
	.then(data => years[7].addProduct(products[15]))
	.then(data => years[8].addProduct(products[16]))
	.then(data => years[9].addProduct(products[17]))
	.then(data => years[10].addProduct(products[18]))
	.then(data => years[11].addProduct(products[19]))

	// En la tabla products, tenemos un campo 'cellarId' que nos indica a que cellar pertenece cada product.		
	.then(data => cellars[0].addProduct(products[0]))
	.then(data => cellars[1].addProduct(products[1]))
	.then(data => cellars[2].addProduct(products[2]))
	.then(data => cellars[3].addProduct(products[3]))
	.then(data => cellars[4].addProduct(products[4]))
	.then(data => cellars[5].addProduct(products[5]))
	.then(data => cellars[6].addProduct(products[6]))
	.then(data => cellars[7].addProduct(products[7]))
	.then(data => cellars[8].addProduct(products[8]))
	.then(data => cellars[9].addProduct(products[9]))
	.then(data => cellars[10].addProduct(products[10]))
	.then(data => cellars[11].addProduct(products[11]))
	.then(data => cellars[12].addProduct(products[12]))
	.then(data => cellars[13].addProduct(products[13]))
	.then(data => cellars[14].addProduct(products[14]))
	.then(data => cellars[15].addProduct(products[15]))
	.then(data => cellars[16].addProduct(products[16]))
	.then(data => cellars[17].addProduct(products[17]))
	.then(data => cellars[18].addProduct(products[18]))
	.then(data => cellars[19].addProduct(products[19]))

	// En la tabla lines, tenemos un campo 'cellarId' que nos indica a que cellar pertenece cada line.
	.then(data => cellars[0].addLine(lines[0]))
	.then(data => cellars[0].addLine(lines[1]))
	.then(data => cellars[0].addLine(lines[2]))
	.then(data => cellars[1].addLine(lines[3]))
	.then(data => cellars[1].addLine(lines[4]))
	.then(data => cellars[2].addLine(lines[5]))
	.then(data => cellars[2].addLine(lines[6]))
	.then(data => cellars[3].addLine(lines[7]))
	.then(data => cellars[4].addLine(lines[8]))
	.then(data => cellars[5].addLine(lines[9]))
	.then(data => cellars[6].addLine(lines[10]))
	.then(data => cellars[7].addLine(lines[11]))
	.then(data => cellars[8].addLine(lines[12]))
	.then(data => cellars[9].addLine(lines[13]))
	.then(data => cellars[10].addLine(lines[14]))
	.then(data => cellars[11].addLine(lines[15]))
	.then(data => cellars[12].addLine(lines[16]))
	.then(data => cellars[13].addLine(lines[17]))
	.then(data => cellars[14].addLine(lines[18]))
	.then(data => cellars[15].addLine(lines[19]))
	.then(data => cellars[16].addGrape(grapes[5]))
	.then(data => cellars[17].addGrape(grapes[6]))
	.then(data => cellars[18].addGrape(grapes[7]))
	.then(data => cellars[19].addGrape(grapes[8]))

	// En la tabla intermedia 'cellar_grape' tenemos las relaciones entre diferentes grapes y cellars.
	.then(data => cellars[0].addGrape(grapes[0]))
	.then(data => cellars[1].addGrape(grapes[0]))
	.then(data => cellars[2].addGrape(grapes[1]))
	.then(data => cellars[3].addGrape(grapes[1]))
	.then(data => cellars[3].addGrape(grapes[2]))
	.then(data => cellars[4].addGrape(grapes[3]))
	.then(data => cellars[3].addGrape(grapes[3]))
	.then(data => cellars[2].addGrape(grapes[4]))
	.then(data => cellars[5].addGrape(grapes[4]))
	.then(data => cellars[7].addGrape(grapes[4]))
	.then(data => cellars[7].addGrape(grapes[5]))
	.then(data => cellars[8].addGrape(grapes[6]))
	.then(data => cellars[9].addGrape(grapes[7]))
	.then(data => cellars[10].addGrape(grapes[8]))
	.then(data => cellars[11].addGrape(grapes[9]))
	.then(data => cellars[7].addGrape(grapes[5]))
	.then(data => cellars[8].addGrape(grapes[6]))
	.then(data => cellars[9].addGrape(grapes[7]))
	.then(data => cellars[10].addGrape(grapes[8]))
	.then(data => cellars[11].addGrape(grapes[9]))

	// En la tabla 'product_grape' tenemos las relaciones entre diferentes grapes y products.
	.then(data => products[0].addGrape(grapes[0]))
	.then(data => products[1].addGrape(grapes[0]))
	.then(data => products[1].addGrape(grapes[1]))
	.then(data => products[3].addGrape(grapes[1]))
	.then(data => products[3].addGrape(grapes[2]))
	.then(data => products[4].addGrape(grapes[3]))
	.then(data => products[3].addGrape(grapes[3]))
	.then(data => products[2].addGrape(grapes[4]))
	.then(data => products[5].addGrape(grapes[4]))
	.then(data => products[7].addGrape(grapes[4]))
	.then(data => products[7].addGrape(grapes[5]))
	.then(data => products[8].addGrape(grapes[6]))
	.then(data => products[9].addGrape(grapes[7]))
	.then(data => products[10].addGrape(grapes[8]))
	.then(data => products[11].addGrape(grapes[9]))
	.then(data => products[6].addGrape(grapes[5]))
	.then(data => products[8].addGrape(grapes[6]))
	.then(data => products[9].addGrape(grapes[7]))
	.then(data => products[12].addGrape(grapes[8]))
	.then(data => products[11].addGrape(grapes[9]))
	.then(data => products[13].addGrape(grapes[5]))
	.then(data => products[14].addGrape(grapes[6]))
	.then(data => products[15].addGrape(grapes[7]))
	.then(data => products[16].addGrape(grapes[8]))
	.then(data => products[17].addGrape(grapes[9]))
	.then(data => products[17].addGrape(grapes[5]))
	.then(data => products[18].addGrape(grapes[6]))
	.then(data => products[19].addGrape(grapes[7]))
	.then(data => products[19].addGrape(grapes[8]))
	.then(data => products[12].addGrape(grapes[10]))
	.then(data => products[12].addGrape(grapes[11]))
	.then(data => products[11].addGrape(grapes[12]))
	.then(data => products[13].addGrape(grapes[13]))
	.then(data => products[14].addGrape(grapes[14]))
	.then(data => products[15].addGrape(grapes[15]))
	.then(data => products[16].addGrape(grapes[16]))
	.then(data => products[17].addGrape(grapes[17]))
	.then(data => products[17].addGrape(grapes[18]))
	.then(data => products[18].addGrape(grapes[19]))
	.then(data => products[19].addGrape(grapes[19]))
	.then(data => products[19].addGrape(grapes[18]))
	.then(data => products[12].addGrape(grapes[11]))

	// En la tabla 'orders' tenemos un campo 'userId' que nos indica a que user pertenece cada order.
	.then(data => users[0].addOrder(orders[0]))
	.then(data => users[0].addOrder(orders[1]))
	.then(data => users[0].addOrder(orders[2]))
	.then(data => users[0].addOrder(orders[3]))
	.then(data => users[0].addOrder(orders[4]))
	.then(data => users[0].addOrder(orders[5]))
	.then(data => users[0].addOrder(orders[6]))
	.then(data => users[0].addOrder(orders[7]))
	.then(data => users[0].addOrder(orders[8]))
	.then(data => users[0].addOrder(orders[9]))
	.then(data => users[0].addOrder(orders[10]))
	.then(data => users[0].addOrder(orders[11]))
	.then(data => users[0].addOrder(orders[12]))
	.then(data => users[0].addOrder(orders[13]))
	.then(data => users[0].addOrder(orders[14]))


	// Relacionamos productos a lineas:
	.then(data => lines[0].addProduct(products[0]))
	.then(data => lines[1].addProduct(products[1]))
	.then(data => lines[2].addProduct(products[2]))
	.then(data => lines[3].addProduct(products[3]))
	.then(data => lines[4].addProduct(products[4]))
	.then(data => lines[5].addProduct(products[5]))
	.then(data => lines[6].addProduct(products[6]))
	.then(data => lines[7].addProduct(products[7]))
	.then(data => lines[8].addProduct(products[8]))
	.then(data => lines[9].addProduct(products[9]))
	.then(data => lines[10].addProduct(products[10]))
	.then(data => lines[11].addProduct(products[11]))
	.then(data => lines[12].addProduct(products[12]))
	.then(data => lines[13].addProduct(products[13]))
	.then(data => lines[14].addProduct(products[14]))
	.then(data => lines[15].addProduct(products[15]))
	.then(data => lines[16].addProduct(products[16]))
	.then(data => lines[17].addProduct(products[17]))
	.then(data => lines[18].addProduct(products[18]))
	.then(data => lines[19].addProduct(products[19]))

	
	.then(data => console.log('=================== PRODUCTOS CARGADOS A LA BASE DE DATOS ===================='))
	.catch(e => console.log(e))
});