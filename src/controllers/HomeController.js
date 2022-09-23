const Actualite = require('../models/Actualite');
const moment = require('moment');
exports.home = (req, res) => {
    Actualite.findAll(function (actualites) {
        console.log(actualites.length);
        res.render('home/index', { actualites, moment });
    });
}

exports.about = (req, res) => {
    res.render('home/about');
}
