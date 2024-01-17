const db = require('../database/database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto')


// Route pour inscrire un utilisateur utilisé dans InscriptionConnexion.jsx
exports.Inscription = async (req, res) => {
    try {
        const { nom, prenom, user_name, mot_de_passe } = req.body;
        const id = crypto.randomUUID();
        const date_creation = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
        const admin = false;
        await db.pool.execute(
            'INSERT INTO utilisateur (id, nom, prenom, user_name, date_creation, mot_de_passe, admin) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [id, nom, prenom, user_name, date_creation, hashedPassword, admin]
        );
        res.status(200).json({ message: "Utilisateur ajouté avec succès" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Erreur lors de l'ajout de l'utilisateur" });
    }
};

// Route pour la connexion utilisé dans InscriptionConnexion.jsx
exports.Connexion = async (req, res) => {
    console.log(req.body);
    const { user_name, mot_de_passe } = req.body;
    try {
        const [rows] = await db.pool.execute('SELECT * FROM utilisateur WHERE user_name = ?', [user_name]);
        if (rows.length === 0) {
            return res.status(401).json({ error: "Nom d'utilisateur ou mot de passe incorrect" });
        }
        const hashedPassword = rows[0].mot_de_passe;
        const passwordMatch = await bcrypt.compare(mot_de_passe, hashedPassword);
        if (passwordMatch) {
            res.status(200).json({ userId: rows[0].id, isAdmin: rows[0].admin, message: "Authentification réussie" });
        } else {
            res.status(401).json({ error: "Nom d'utilisateur ou mot de passe incorrect" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Erreur lors de la connexion" });
    }
}