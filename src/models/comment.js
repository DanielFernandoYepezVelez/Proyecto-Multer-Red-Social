const { Schema, model } = require('mongoose');
const ObjectId = Schema.ObjectId; //No siempre es obligatorio Utilizar la destructuracion de un objeto

const commentSchema = new Schema({
    image_id: { type: ObjectId }, //Por que pertenece a otra colección, por ende voy a relacionar la imagen con el comentario atraves del id de la imagen
    email: { type: String },
    name: { type: String },
    gravatar: { type: String },
    comment: { type: String },
    timestamp: { type: Date, default: Date.now }
});

/* Servicio de Gravatar
Esta relacionado con wordpress
Si te registras con el correo
y una imagen, esa imagen siempre
se va a mostrar donde sea que utilices
ese correo.(Es como un avatar).
 
Esta vez no nos vamos a registrar
solo tenemos que darle un formato
hash md5 a la imagen
*/

module.exports = model('Comment', commentSchema);