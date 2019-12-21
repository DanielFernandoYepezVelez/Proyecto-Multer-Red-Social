const { Schema, model } = require('mongoose');
const path = require('path');

const imageSchema = new Schema({
    title: { type: String },
    description: { type: String },
    filename: { type: String },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    timestamp: { type: Date, default: Date.now }
});

/* Variable virtual =>
No se va a guardar en la base de datos
sino que solo se va a generar cuando llamemos
Este modelo.*/
/* uniqueId Le quita la extension
al nombre de la imagen y me
permite que esta funcion solo
me devuelva desde la base de 
datos el filename de la imagen sin su
extension*/
imageSchema.virtual('uniqueId')
    .get(function() {
        return this.filename.replace(path.extname(this.filename), '')
    });

module.exports = model('Image', imageSchema);