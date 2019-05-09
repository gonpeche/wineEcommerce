const express= require('express');
const router= express();
var passport = require('passport');

var { User } = require('../db/models/index');


// Ruta para logout.
router.post('/logout',(req,res)=>{
    req.logout();
    res.send('Usuario no logueado');
})

// Ruta para registro de nuevo usuario
router.post('/register', (req, res, )=>{
     User.create({
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
				access: 1
    })
    .then(user => {
        res.send(user)
    })
    .catch(e => console.log(e));  
})

// Ruta para promover administrador.
router.post('/registerAdmin', (req, res, )=>{
    User.create({
       email: req.body.email,
       password: req.body.password,
       firstName: req.body.firstName,
       lastName: req.body.lastName,
       access : 5
      
   })
   .then(user => {
       res.send({
				 id : user.id,
				 firstName : user.firstName,
				 lastName : user.lastName,
				 email : user.email,
				 access : user.access,
				 
			 })
   })
   .catch(e => console.log(e));

 
})

// Ruta para loguearse.
router.post('/login', passport.authenticate('local'), (req, res)=>{
  const authenticated = req.isAuthenticated();
 	User.findById(req.user.id)
		.then(data => data.dataValues)
		.then(user => {
			if(authenticated){
				res.send({
						id:user.id,
						firstName: user.firstName,
						lastName: user.lastName,
						email: user.email,
						telefono: user.telefono,
						domicilio: user.domicilio,
						ciudad: user.ciudad,
						provincia: user.provincia,
						access: user.access
				})
			}else{
				console.log('NO ESTAS AUTENTICADO')
				res.sendStatus(401)
			}
		})
})

// Ruta para actualizar los datos de un usuario.
router.put('/:id/update', (req,res) => {
	User.findById(req.params.id)
		.then(user => user.update(req.body))
		.then(user => res.send(201))
		.catch(e => console.log(e))
});

// Ruta que busca por ID y nos devuelve un usuario.
router.get('/:id', (req,res) => {
	User.findById(req.params.id)
		.then(data => res.send(data))
		.catch(e => console.log(e))
});

// Ruta que nos devuelve todos los usuarios.
router.get('/', (req,res) => {
	User.findAll({})
		.then(data => res.send(data))
		.catch(e => console.log(e))
});

module.exports = router