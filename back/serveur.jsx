const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
const app = express()
const fs = require('fs').promises;
require('dotenv').config()

const pool = mysql.createPool({
    host: process.env.BD_HOST,
    user: process.env.BD_USER,
    password: process.env.BD_PWD,
    database: process.env.BD_DTB,
    port: process.env.BD_PORT,
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

// Configuration de multer pour gérer les téléchargements de fichiers
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '../front/src/assets/produits'));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.png');
    },
});

const upload = multer({ storage: storage });

app.use(express.json());
app.use(cors());

// On définit la route racine "/"
app.get("/", (req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1> Page d'accueil <h1> "); // On renvoie du code HTML
});

// Route pour ajouter un utilisateur utilisé dans Connexion.jsx
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

// Route pour la connexion utilisé dans Connexion.jsx
app.post('/connexion', withDBConnection, async (req, res) => {
    const { user_name, mot_de_passe } = req.body;
    try {
        const [rows] = await req.dbConnection.execute('SELECT * FROM utilisateur WHERE user_name = ?', [user_name]);
        if (rows.length === 0) {
            return res.status(401).json({ error: "Nom d'utilisateur ou mot de passe incorrect" });
        }
        const hashedPassword = rows[0].mot_de_passe;
        const passwordMatch = await bcrypt.compare(mot_de_passe, hashedPassword);
        if (passwordMatch) {
            // Authentification réussie
            res.status(200).json({ userId: rows[0].id, isAdmin: rows[0].admin, message: "Authentification réussie" });
        } else {
            // Mot de passe incorrect
            res.status(401).json({ error: "Nom d'utilisateur ou mot de passe incorrect" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Erreur lors de la connexion" });
    }
});

// Route pour obtenir un user_name par ID utilisé dans App.jsx
app.get('/user_name/:id', withDBConnection, async (req, res) => {
    const id = req.params.id;
    try {
        console.log("Lancement de la requête");
        const [rows, fields] = await req.dbConnection.execute('SELECT user_name FROM utilisateur WHERE id = ?', [id]);
        console.log(rows);
        res.status(200).json(rows);

    } catch (err) {
        console.log(err);
        res.status(500).send("Erreur lors de l'exécution de la requête");
    }
});

// Route pour ajouter un produit utilisé dans AdminProduit.jsx
app.post('/produit', withDBConnection, upload.single('image'), async (req, res) => {
    try {
        const { nom, prix, quantite, description } = req.body;
        const id = crypto.randomUUID();
        const date_creation = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const image = req.file;
        // Utiliser sharp pour redimensionner l'image
        const resizedImagePath = path.join(__dirname, '../front/src/assets/produits', `${id}.png`);
        await sharp(image.path).resize(300, 200).toFile(resizedImagePath);
        // Supprimer l'image d'origine après redimensionnement
        await fs.unlink(image.path);
        await req.dbConnection.execute(
            'INSERT INTO produit (id, nom, prix, quantite, description, date_creation) VALUES (?, ?, ?, ?, ?, ?)',
            [id, nom, prix, quantite, description, date_creation]
        );

        res.status(200).json({ message: "Produit ajouté avec succès" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Erreur lors de l'ajout d'un produit" });
    }
});

//Route pour obtenir tous les produits dans AdminProduit.jsx
app.get('/produit', withDBConnection, async (req, res) => {
    try {
        console.log("Lancement de la requête");
        const [rows, fields] = await req.dbConnection.execute('SELECT * FROM produit');
        // Ajouter le chemin de l'image à chaque produit
        const productsWithImagePath = rows.map(product => ({
            ...product,
            image_path: `../assets/produits/${product.id}.png`,
        }));
        console.log(productsWithImagePath);
        res.status(200).json(productsWithImagePath);
    } catch (error) {
        console.log(error);
        res.status(500).send("Erreur lors de l'exécution de la requête");
    }
});

//Route pour supprimer un produit en fonction de son id dans AdminProduit.jsx
app.delete('/produit/:id', withDBConnection, async (req, res) => {
    const id = req.params.id;
    const imagePath = path.join(__dirname, '../front/src/assets/produits', `${id}.png`);
    try {
        // Vérifier si le produit existe avant de le supprimer
        const [rows] = await req.dbConnection.execute('SELECT * FROM produit WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: "Produit non trouvé" });
        }
        // Le produit existe, supprimer le fichier
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
            console.log("Fichier supprimé avec succès");
        } else {
            console.log("Le fichier n'existe pas");
        }
        // Procéder à la suppression du produit dans la base de données
        await req.dbConnection.execute('DELETE FROM produit WHERE id = ?', [id]);
        res.status(200).json({ message: "Produit supprimé avec succès" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Erreur lors de la suppression du produit" });
    }
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