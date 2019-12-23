const pathExpress = require('path');
const fs = require('fs-extra');

/* Importo todos los Models desde el index.js*/
const { Image } = require('../models');

const { randomLetterAndNumber } = require('../helpers/libs');
const controller = {};

controller.index = async(req, res) => {
    try {
        const { image_id } = req.params;

        const imageId = await Image.findOne({ filename: { $regex: image_id } });

        res.render('image', { imageId });

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

controller.comment = (req, res) => {
    res.send('Index Page');
}

controller.remove = (req, res) => {
    res.send('Index Page');
}

module.exports = controller;