var db = require('../index');
const Sequelize = require('sequelize');

// Modelo uvas. Lo usaremos para filtrar vinos por esta categoría.
const Grape = db.define('grape', {
    grapeName: {
        type: Sequelize.STRING,
    },
});

module.exports = Grape;
