const db = require('../database/database');
const jwt = require('jsonwebtoken');

//Route pour obtenir le rôle par ID utilisé dans App.jsx
exports.GetUserRole = async (req, res) => {
    const id = req.params.id;
    try {
        console.log("Lancement de la requête");
        const [rows] = await db.pool.execute('SELECT admin FROM utilisateur WHERE id = ?', [id]);
        console.log(rows);
        res.status(200).json(rows);
    } catch (error) {
        console.log(err);
        res.status(500).send("Erreur lors de l'exécution de la requête");
    }
};

// Route pour obtenir un user_name par ID utilisé dans Navbar.jsx
exports.GetUserName = async (req, res) => {
    const id = req.params.id;
    try {
        console.log("Lancement de la requête");
        const [rows] = await db.pool.execute('SELECT user_name FROM utilisateur WHERE id = ?', [id]);
        console.log(rows);
        res.status(200).json(rows);
    } catch (err) {
        console.log(err);
        res.status(500).send("Erreur lors de l'exécution de la requête");
    }
};