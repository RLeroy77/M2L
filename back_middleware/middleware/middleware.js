const db = require('../database/database');

// Middleware pour gérer la connexion à la base de données
exports.withDBConnection = async (req, res, next) => {
    try {
        console.log("Lancement de la connexion");
        req.db = db.pool;
        console.log("Connexion réussie");
        next(); // Passez à la route suivante
    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur de connexion à la base de données");
    }
};