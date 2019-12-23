/* Esto es un objeto vacio, al cual posteriormente
le voy añadir funciones y exportarlas */
const controller = {};

const { Image } = require('../models');

controller.index = async(req, res) => {
    const images = await Image.find().sort({ timestamp: -1 });
    res.render('index', { images });
}

controller.create = (req, res) => {
    res.send('Index Page');
}

/* Una Cosa Es Exportar Un Modulo
Y Otra Cosa Es Exportar Propiedades */
module.exports = controller;