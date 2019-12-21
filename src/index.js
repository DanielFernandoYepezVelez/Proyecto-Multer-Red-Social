require('./database');
const express = require('express');
const configServer = require('./server/index');

const app = configServer(express());

app.listen(app.get('port'), () => {
    console.log(`Server Is Running On Port ${app.get('port')}`);
});