const exphbs = require('express-handlebars');
const errorHandler = require('errorhandler');
const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');

const routes = require('../routes/index');

module.exports = app => {

    /* Settings */
    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(__dirname, '../views/'));
    app.engine('.hbs', exphbs({
        defaultLayout: 'main',
        partialsDir: path.join(app.get('views'), './partials/'),
        layoutsDir: path.join(app.get('views'), './layout/'),
        extname: '.hbs',
        helpers: require('./hbsHelpers')
    }));
    app.set('view engine', '.hbs');

    /* Middlewares */
    app.use(morgan('dev'));
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(multer({
        dest: path.join(__dirname, '../public/upload/temp')
    }).single('image'));

    /* Routes */
    routes(app);

    /* Static Files*/
    app.use(express.static(path.join(__dirname, '../public/')));

    /* Manejador de errores */
    if ('development' === app.get('env')) {
        app.use(errorHandler);
    }

    return app;
}