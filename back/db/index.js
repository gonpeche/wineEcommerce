const Sequelize= require('sequelize');
const db = new Sequelize('postgres://localhost:5432/la_bodeguita', {loggin : false});

module.exports= db;