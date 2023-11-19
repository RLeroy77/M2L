const express = require('express')
const app = express()
const mysql = require('mysql2')
const cors = require('cors')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
require('dotenv').config()

const pool = mysql.createPool({
    host: process.env.BD_HOST,
    user: process.env.BD_USER,
    password: process.env.BD_PWD,
    database: process.env.BD_DTB,
})


// Middleware pour gérer la connexion à la base de données
const withDBConnection = async (req, res, next) => {
    try {
        console.log("Lancement de la connexion");
        req.dbConnection = pool.promise();
        console.log("Connexion réussie");
        next(); // Passez à la route suivante

    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur de connexion à la base de données");
    }
};

app.use(express.json())
app.use(cors())

// On définit la route racine "/"
app.get("/", (req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1> Page d'accueil <h1> "); // On renvoie du code HTML
});

// Route pour obtenir toutes les utilisateurs
app.get('/utilisateur', withDBConnection, async (req, res) => {
    try {
        console.log("Lancement de la requête");
        const [rows, fields] = await req.dbConnection.execute('SELECT * FROM utilisateur');
        console.log(rows);
        res.status(200).json(rows);

    } catch (err) {
        console.log(err);
        res.status(500).send("Erreur lors de l'exécution de la requête");
    }
});

// Route pour obtenir un utilisateur par ID
app.get('/utilisateur/:id', withDBConnection, async (req, res) => {
    const id = req.params.id;
    try {
        console.log("Lancement de la requête");
        const [rows, fields] = await req.dbConnection.execute('SELECT * FROM utilisateur WHERE id = ?', [id]);
        console.log(rows);
        res.status(200).json(rows);

    } catch (err) {
        console.log(err);
        res.status(500).send("Erreur lors de l'exécution de la requête");
    }
});

// Route pour ajouter un utilisateur par ID
app.post('/utilisateur', withDBConnection, async (req, res) => {
    try {
        const { nom, prenom, user_name, mot_de_passe } = req.body;
        const id = crypto.randomUUID();
        const date_creation = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
        const admin = false;
        await req.dbConnection.execute(
            'INSERT INTO utilisateur (id, nom, prenom, user_name, date_creation, mot_de_passe, admin) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [id, nom, prenom, user_name, date_creation, hashedPassword, admin]
        );
        res.status(200).json({ message: "Utilisateur ajouté avec succès" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Erreur lors de l'ajout de l'utilisateur" });
    }
});

// Route pour mettre à jour un utilisateur par ID
app.put('/utilisateur/:id', withDBConnection, async (req, res) => {
    const id = req.params.id;
    try {
        // Vérifier si l'utilisateur existe avant de le mettre à jour
        const [existingUser] = await req.dbConnection.execute('SELECT * FROM utilisateur WHERE id = ?', [id]);

        if (existingUser.length === 0) {
            return res.status(404).json({ error: "Utilisateur non trouvé" });
        }

        // Utilisateur trouvé, procéder à la mise à jour
        const { nom, prenom, user_name, mot_de_passe, admin } = req.body;
        const date_mise_a_jour = new Date().toISOString().slice(0, 19).replace('T', ' ');

        // Si un nouveau mot de passe est fourni, le hasher
        const hashedPassword = mot_de_passe ? await bcrypt.hash(mot_de_passe, 10) : existingUser[0].mot_de_passe;

        // Effectuer la mise à jour dans la base de données
        await req.dbConnection.execute(
            'UPDATE utilisateur SET nom = ?, prenom = ?, user_name = ?, mot_de_passe = ?, admin = ?, date_mise_a_jour = ? WHERE id = ?',
            [nom, prenom, user_name, hashedPassword, admin, date_mise_a_jour, id]
        );

        res.status(200).json({ message: "Utilisateur mis à jour avec succès" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Erreur lors de la mise à jour de l'utilisateur" });
    }
});


// Route pour supprimer un utilisateur par ID
app.delete('/utilisateur/:id', withDBConnection, async (req, res) => {
    const id = req.params.id;
    try {
        // Vérifier si l'utilisateur existe avant de le supprimer
        const [rows] = await req.dbConnection.execute('SELECT * FROM utilisateur WHERE id = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: "Utilisateur non trouvé" });
        }

        // L'utilisateur existe, procéder à la suppression
        await req.dbConnection.execute('DELETE FROM utilisateur WHERE id = ?', [id]);
        res.status(200).json({ message: "Utilisateur supprimé avec succès" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Erreur lors de la suppression de l'utilisateur" });
    }
});




app.listen(8000, () => {
    console.log("Serveur à l'écoute")
})