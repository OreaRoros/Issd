const Actualite = require('../models/Actualite');
let connection = require('../config/db');
let moment = require('moment');

exports.index = async (req, res) => {
    res.render('Backend/Admin/admin')
}

//Actualités

exports.actualite = (req, res) => {
    const resultsPerPage = 25;
    let sql = 'SELECT * FROM actualite';
    connection.query(sql, (err, result) => {
        if (err) throw err;
        const numOfResults = result.length;
        const numberOfPages = Math.ceil(numOfResults / resultsPerPage);
        let page = req.query.page ? Number(req.query.page) : 1;
        if (page > numberOfPages && page > 0) {
            res.redirect('/admin-actualite/?page=' + encodeURIComponent(numberOfPages));
        } else if (page < 1 && page > 0) {
            res.redirect('/admin-actualite/?page=' + encodeURIComponent('1'));
        }
        console.log('Nombre de page', page);
        var startingLimit = 0;
        if (page > 0) {
            startingLimit = (page - 1) * resultsPerPage;
        }
        sql = `SELECT * FROM actualite LIMIT ${startingLimit},${resultsPerPage}`;

        connection.query(sql, (err, result) => {
            if (err) throw err;
            let iterator = (page - 5) < 1 ? 1 : page - 5;
            let endingLink = (iterator + 9) <= numberOfPages ? (iterator + 9) : page + (numberOfPages - page);
            if (endingLink < (page + 4)) {
                iterator -= (page + 4) - numberOfPages
            }
            res.render('Backend/Admin/Actualite/actualite', { moment, result: result, numOfResults, page, iterator, endingLink, numberOfPages });
        })
    })
}

// exports.actualites = async (req, res) => {

//     Actualite.findAll(function (actualites) {
//         res.render('Backend/Admin/Actualite/actualite', { actualites });
//     });
// }

exports.viewaddactu = async (req, res) => {
    res.render('Backend/Admin/Actualite/addactualite');
}

exports.addactualite = async (req, res) => {
    if (req.body === undefined || req.body === '') {
        req.flash('error', "Vous n'avez pas rempli les formulaires");
        res.redirect('/admin-add-actualite');
    } else {
        var content = [];
        if (!req.file) {
            content = [req.body.titre, req.body.expiration, req.body.description];
            Actualite.creates(content, function () {
                req.flash('success', 'Ajouter avec succès');
                res.redirect('/admin-actualite');
            });
        } else {
            content = [req.body.titre, req.body.expiration, req.file.filename, req.body.description];
            Actualite.create(content, function () {
                req.flash('success', 'Ajouter avec succès');
                res.redirect('/admin-actualite');
            });
        }
    }
}

exports.vieweditactualite = async (req, res) => {
    Actualite.findOne(req.params.id, function (actualites) {
        res.render('Backend/Admin/Actualite/editactualite', { actualites });
    });
}

exports.editactualite = async (req, res) => {
    if (req.body === undefined || req.body === '') {
        req.flash('error', "Vous n'avez pas rempli les formulaires");
        res.redirect('/admin-edit-actualite');
    } else {
        var content = [];
        if (!req.file) {
            content = [req.body.titre, req.body.expiration, req.body.description];
            Actualite.updates(content, req.params.id, function () {
                req.flash('success', 'Modifier avec succès');
                res.redirect('/admin-actualite');
            });
        } else {
            content = [req.body.titre, req.body.expiration, req.file.filename, req.body.description];
            Actualite.update(content, req.params.id, function () {
                req.flash('success', 'Modifier avec succès');
                res.redirect('/admin-actualite');
            });
        }
    }
}

exports.deleteactu = async (req, res) => {
    Actualite.delete(req.params.id, (success, err) => {
        if (success) {
            req.flash('success', "Supprimé avec succès");
            res.redirect('/admin-actualite');
        } else {
            req.flash('error', 'Erreur lors de la suppression');
            res.redirect('/admin-actualite');
        }

    })
}

exports.search = (req, res) => {
    var search = req.body.titre;
    let sql = "SELECT * FROM actualite WHERE titre LIKE '%" + search + "%'";
    connection.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    })
}