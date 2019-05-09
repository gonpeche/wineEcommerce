
const express= require ('express');
const router= express();

// Ruta para comprobar si el usuario está logueado o no.
router.get('/', (req,res)=>{
    req.user ? res.send(req.user) : res.send({user: false})
})

module.exports = router;