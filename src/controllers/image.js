const pathExpress = require('path');
const fs = require('fs-extra');
const md5 = require('md5');

/* Importo todos los Models desde el index.js*/
const { Image, Comment } = require('../models');

const { randomLetterAndNumber } = require('../helpers/libs');
const controller = {};

controller.index = async(req, res) => {
    try {
        const { image_id } = req.params;

        /* Aqui no obtengo el id de la imagen, yo estoy obteniendo todo el objeto image */
        const imageId = await Image.findOne({ filename: { $regex: image_id } });
        const comments = await Comment.find({ image_id: imageId._id });

        res.render('image', { imageId, comments });

    } catch (error) {
        console.log(error);
    }
}

controller.create = (req, res) => {
    const saveImage = async() => {
        const { originalname, path } = req.file;
        const { title, description } = req.body;

        const nameImageUrl = randomLetterAndNumber();
        const images = await Image.find({ filename: nameImageUrl });

        if (images.length > 0) {
            saveImage();

        } else {

            const extname = pathExpress.extname(originalname).toLowerCase();
            /* Aqui esta la ruta donde quiero almacenar la imagen en un futuro */
            const targetPath = pathExpress.resolve(`./src/public/upload/${nameImageUrl}${extname}`);

            if (extname === '.png' || extname === '.jpg' || extname === '.jpeg' || extname === '.gif') {
                /* Mueve un archivo de un directorio a otro directorio 
                la ruta donde esta mi imagen y a donde quiero moverla */
                await fs.rename(path, targetPath);

                const newImg = new Image({
                    filename: nameImageUrl + extname,
                    title,
                    description
                });
                const imageSaved = await newImg.save();
                res.redirect('/images');

            } else {

                await fs.unlink(path);
                res.status(500).json({
                    error: 'Only Images Are Allowed'
                });
            }
        }
    }
    saveImage();
}

controller.like = (req, res) => {
    res.send('Index Page');
}

controller.comment = async(req, res) => {
    try {
        const { image_id } = req.params;
        const { name, email, comment } = req.body

        const image = await Image.findOne({ filename: { $regex: image_id } });

        // return console.log(image); Me devuelve un objeto y funciona para la validación

        if (image) {
            const newComment = new Comment({
                name,
                email,
                comment
            });
            newComment.gravatar = md5(newComment.email); /* Aqui Estamo aplicando el modulo de gravatar md5 */
            newComment.image_id = image._id; /* Obteniendo el id de la imagen que se consulto en DB */

            await newComment.save();
            res.redirect('/' + image.uniqueId);
        }

    } catch (error) {
        console.log(error);
    }
}

controller.remove = (req, res) => {
    res.send('Index Page');
}

module.exports = controller;