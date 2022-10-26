let connection = require('../config/db');
let moment = require('../config/moment');

class Actualite {
    constructor(row) {
        this.row = row
    }

    get id() {
        return this.row.id
    }

    get titre() {
        return this.row.titre
    }

    get description() {
        return this.row.description
    }

    get image() {
        return this.row.image
    }

    get expiration() {
        return moment(this.row.expiration)
    }

    static create(content, cb) {
        connection.query('INSERT INTO actualite SET titre = ?, expiration = ?, image = ?, description = ?', content, (err, result) => {
            if (err) throw err
            cb(result)
        })
    }

    static creates(content, cb) {
        connection.query('INSERT INTO actualite SET titre = ?, expiration = ?, description = ?', content, (err, result) => {
            if (err) throw err
            cb(result)
        })
    }

    static update(content, id, cb) {
        connection.query('UPDATE actualite SET titre = ?, expiration = ?, image = ?, description = ? WHERE id = ' + id, content, (err, result) => {
            if (err) throw err
            cb(result)
        })
    }

    static updates(content, id, cb) {
        connection.query('UPDATE actualite SET titre = ?, expiration = ?, description = ? WHERE id = ' + id, content, (err, result) => {
            if (err) throw err
            cb(result)
        })
    }

    static findAll(cb) {
        connection.query('SELECT * FROM actualite', (err, rows) => {
            if (err) throw err
            cb(rows.map((row) => new Actualite(row)))
        })
    }

    static findOne(id, cb) {
        connection.query('SELECT * FROM actualite WHERE id = ? LIMIT 1', [id], (err, rows) => {
            if (err) throw err
            cb(new Actualite(rows[0]))
        })
    }

    static delete(id, cb) {
        connection.query('DELETE FROM actualite WHERE id = ?', [id], (err, rows) => {
            if (err) throw err
            cb(new Actualite(rows[0]))
        })
    }
}

module.exports = Actualite;