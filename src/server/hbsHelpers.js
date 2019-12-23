/* Aqui tenemos las funciones que se van
a ejecutar en todas las vistas del programa */

const moment = require('moment');
const helpers = {};

helpers.moment = timestamp => {
    return moment(timestamp).startOf('minute').fromNow();
}

module.exports = helpers;