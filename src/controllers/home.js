/* Esto es un objeto vacio, al cual posteriormente
le voy añadir funciones y exportarlas */
const controller = {};

controller.index = (req, res) => {
    res.render('index');
    // res.send('<h1>Hola Mundo</h1>');
}

controller.create = (req, res) => {
    res.send('Index Page');
}

/* Una Cosa Es Exportar Un Modulo
Y Otra Cosa Es Exportar Propiedades */
module.exports = controller;