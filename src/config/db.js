const mysql = require('mysql');
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'issd',
    multipleStatements: true
})
connection.connect((error => {
    if (error) { console.log("Appuyer la combinaison ctrl+c pour quitter le programme \npuis Démarrer le WampServer et Relancer la Commande pour lancer le programme") }
    else { console.log("Connexion à la base de données réussie") }
}));

module.exports = connection;