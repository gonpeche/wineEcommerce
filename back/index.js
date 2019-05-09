// REQUIREMENTS
var express= require('express');
var path= require('path');
var bodyParser= require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');

// MODELS & SYNC
var db= require('./db/index');
const User = require('./db/models/User');

// Las tablas en la DB van a crearse en la medida que sean requeridas por 
// los distintos recursos de la app, por ej: las rutas (const Product= require('./db/models'));
// db.sync({ force: false })
// 	.then(function(){
// 		app.listen(3000, function(){
// 			console.log('Listening on port 3000');	
// 		})
// 	});




// APP
var app= express();
app.use(express.static(path.resolve(__dirname, '../front/dist/')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser())
app.use(session({ secret: 'wine' }));
app.use(passport.initialize());
app.use(passport.session());

app.listen(3000, function(){
	console.log('Listening on port 3000');	
})

// PASSPORT
passport.use(new LocalStrategy({
	usernameField:'email'
},
	function(email, password, done) {
		User.findOne({ where: { email }})
			.then(user => {
				if (!user) {
					return done(null, false, { message: 'Incorrect username.' });
				}
				if (user.passHash(password, user.salt) !== user.password) {
					return done(null, false, { message: 'Incorrect password.' });
				}
				return done(null, user);
			}).catch(err => {
				done(err);
			});
	}
	));

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(user, done) {
	done(null, user);
});

// ROUTERS
const linesRouter= require('./routes/linesRouter');
const cellarsRouter= require('./routes/cellarsRouter');
const productsRouter= require('./routes/productsRouter');
const grapesRouter= require('./routes/grapesRouter');
const userRouter = require('./routes/userRouter')
const ordersRouter = require('./routes/ordersRouter')
const meRouter = require('./routes/meRouter')

// ROUTES
app.use('/api/cellars', cellarsRouter);
app.use('/api/lines', linesRouter);
app.use('/api/grapes', grapesRouter);
app.use('/api/products', productsRouter);
app.use('/api/user', userRouter);
app.use('/api/orders', ordersRouter)
app.use('/me', meRouter);
app.use('/*', (req,res) => {
	res.sendFile(path.resolve(__dirname, '../front/index.html'));
});


module.exports= app;