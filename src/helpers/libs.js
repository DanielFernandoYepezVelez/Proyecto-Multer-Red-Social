const helpers = {};

/* Aqui estoy retornando una palabra de 6 caracteres entre numeros y letras*/
helpers.randomLetterAndNumber = () => {
    const possibleString = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = 0;

    for (let i = 0; i < 6; i++) {
        let numberDecimal = Math.random() * possibleString.length;
        let numberEntero = Math.floor(numberDecimal);
        randomString += possibleString.charAt(numberEntero);
    }
    return randomString;
}

module.exports = helpers