const { connect } = require('mongoose');
const { database } = require('./keys');

connect(database.URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(db => console.log('DB is connected'))
    .catch(error => console.log(error));