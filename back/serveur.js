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
        cb(null, path.resolve(__dirname, '../front/public/images/produits'));
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


//Fait
// Route pour inscrire un utilisateur utilisé dans InscriptionConnexion.jsx
app.post('/inscription', withDBConnection, async (req, res) => {
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

//Fait
// Route pour la connexion utilisé dans InscriptionConnexion.jsx
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
            res.status(200).json({ userId: rows[0].id, isAdmin: rows[0].admin, message: "Authentification réussie" });
        } else {
            res.status(401).json({ error: "Nom d'utilisateur ou mot de passe incorrect" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Erreur lors de la connexion" });
    }
});


//Fait
//Route pour obtenir le rôle par ID utilisé dans App.jsx
app.get('/role/:id', withDBConnection, async (req, res) => {
    const id = req.params.id;
    try {
        console.log("Lancement de la requête");
        const [rows] = await req.dbConnection.execute('SELECT admin FROM utilisateur WHERE id = ?', [id]);
        console.log(rows);
        res.status(200).json(rows);
    } catch (error) {
        console.log(err);
        res.status(500).send("Erreur lors de l'exécution de la requête");
    }
})


//Fait
// Route pour obtenir un user_name par ID utilisé dans Navbar.jsx
app.get('/user_name/:id', withDBConnection, async (req, res) => {
    const id = req.params.id;
    try {
        console.log("Lancement de la requête");
        const [rows] = await req.dbConnection.execute('SELECT user_name FROM utilisateur WHERE id = ?', [id]);
        console.log(rows);
        res.status(200).json(rows);
    } catch (err) {
        console.log(err);
        res.status(500).send("Erreur lors de l'exécution de la requête");
    }
});


//Fait
// Route pour obtenir un produit en fonction de son ID dans Produit.jsx
app.get('/produit/:id', withDBConnection, async (req, res) => {
    try {
        console.log("Lancement de la requête");
        const productId = req.params.id;
        const [rows] = await req.dbConnection.execute(
            'SELECT id, nom, prix, quantite, description FROM produit WHERE id = ?',
            [productId]
        );

        if (rows.length === 0) {
            // Si aucun produit n'est trouvé avec cet ID
            res.status(404).json({ message: 'Produit non trouvé' });
        } else {
            const product = rows[0];
            res.status(200).json(product);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Erreur lors de l'exécution de la requête");
    }
});

//Fait
//Route pour mettre à jour la quantité des produits lors de la validation du panier dans Panier.jsx
app.put('/panier', withDBConnection, async (req, res) => {
    try {
        const panier = req.body;
        if (!Array.isArray(panier) || panier.length === 0) {
            return res.status(400).json({ message: 'Le panier est vide ou mal formé.' });
        }
        for (const item of panier) {
            const { id, quantite } = item;
            if (!id || !quantite) {
                return res.status(400).json({ message: 'L\'ID du produit et/ou la quantité ne sont pas fournis pour un élément du panier.' });
            }
            const [produit] = await req.dbConnection.execute('SELECT * FROM produit WHERE id = ?', [id]);
            if (!produit.length) {
                return res.status(404).json({ message: `Produit avec l'ID ${id} non trouvé.` });
            }
            const nouvelleQuantite = produit[0].quantite - quantite;
            if (nouvelleQuantite < 0) {
                return res.status(400).json({ message: `La quantité du produit ${id} ne peut pas devenir négative.` });
            }
            await req.dbConnection.execute('UPDATE produit SET quantite = ? WHERE id = ?', [nouvelleQuantite, id]);
        }
        res.json({ message: 'Quantités des produits mises à jour avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour des quantités des produits.' });
    }
});


//Fait
//Route pour obtenir tous les produits dans AdminProduit.jsx et Boutique.jsx
app.get('/produit', withDBConnection, async (req, res) => {
    try {
        console.log("Lancement de la requête");
        const [rows] = await req.dbConnection.execute('SELECT id, nom, prix, quantite, description FROM produit');
        console.log(rows);
        res.status(200).json(rows);
    } catch (error) {
        console.log(error);
        res.status(500).send("Erreur lors de l'exécution de la requête");
    }
});

//Fait
// Route pour ajouter un produit utilisé dans AdminProduit.jsx
app.post('/adminProduit', withDBConnection, upload.single('image'), async (req, res) => {
    try {
        const { nom, prix, quantite, description } = req.body;
        const id = crypto.randomUUID();
        const date_creation = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const image = req.file;
        // Utiliser sharp pour redimensionner l'image
        const resizedImagePath = path.join(__dirname, '../front/public/images/produits', `${id}.png`);
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

//Fait
//Route pour modifier un produit en fonction de son id dans AdminProduit.jsx
app.put('/adminProduit/:id', withDBConnection, async (req, res) => {
    const id = req.params.id;
    try {
        // Vérifier si le produit existe avant de le mettre à jour
        const [existingProduct] = await req.dbConnection.execute('SELECT id FROM produit WHERE id = ?', [id]);
        if (existingProduct.length === 0) {
            return res.status(404).json({ error: "Produit non trouvé" });
        }
        // Produit trouvé, procéder à la mise à jour
        const { nom, prix, quantite, description } = req.body;
        // Construire la requête SQL dynamiquement en fonction des champs fournis
        let updateQuery = 'UPDATE produit SET';
        const updateFields = [];
        // Vérifier chaque champ et ajouter à la liste s'il est fourni
        if (nom !== undefined) {
            updateFields.push(' nom = ?');
        }
        if (prix !== undefined) {
            updateFields.push(' prix = ?');
        }
        if (quantite !== undefined) {
            updateFields.push(' quantite = ?');
        }
        if (description !== undefined) {
            updateFields.push(' description = ?');
        }
        // Combiner les champs dans la requête SQL
        updateQuery += updateFields.join(',') + ' WHERE id = ?';
        console.log(updateQuery);
        // Construire les valeurs de mise à jour
        const updateValues = [];
        // Ajouter chaque valeur de champ à la liste s'il est fourni
        if (nom !== undefined) {
            updateValues.push(nom);
        }
        if (prix !== undefined) {
            updateValues.push(prix);
        }
        if (quantite !== undefined) {
            updateValues.push(quantite);
        }
        if (description !== undefined) {
            updateValues.push(description);
        }
        // Ajouter la valeur de l'ID à la fin du tableau
        updateValues.push(id);
        // Effectuer la mise à jour dans la base de données
        await req.dbConnection.execute(updateQuery, updateValues);
        res.status(200).json({ message: "Produit mis à jour avec succès" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Erreur lors de la mise à jour du produit" });
    }
});

//Fait
//Route pour supprimer un produit en fonction de son id dans AdminProduit.jsx
app.delete('/adminProduit/:id', withDBConnection, async (req, res) => {
    const id = req.params.id;
    const imagePath = path.join(__dirname, '../front/public/images/produits', `${id}.png`);
    try {
        // Vérifier si le produit existe avant de le supprimer
        const [rows] = await req.dbConnection.execute('SELECT id FROM produit WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: "Produit non trouvé" });
        }
        // Procéder à la suppression du produit dans la base de données
        await req.dbConnection.execute('DELETE FROM produit WHERE id = ?', [id]);
        // Supprimer le fichier image associé
        await fs.unlink(imagePath);
        res.status(200).json({ message: "Produit supprimé avec succès" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Erreur lors de la suppression du produit" });
    }
});







//Fait
// Route pour obtenir toutes les utilisateurs dans AdminUser.jsx
app.get('/adminUser', withDBConnection, async (req, res) => {
    try {
        console.log("Lancement de la requête");
        const [rows] = await req.dbConnection.execute('SELECT id, nom, prenom, user_name, date_creation, date_mise_a_jour, admin FROM utilisateur');
        console.log(rows);
        res.status(200).json(rows);
    } catch (err) {
        console.log(err);
        res.status(500).send("Erreur lors de l'exécution de la requête");
    }
});

//Fait
// Route pour mettre à jour le rôle d'un utilisateur fonction de son ID dans AdminUser.jsx
app.put('/adminUser/role/:id', withDBConnection, async (req, res) => {
    const id = req.params.id;
    try {
        // Vérifier si l'utilisateur existe avant de le mettre à jour
        const [existingUser] = await req.dbConnection.execute('SELECT id FROM utilisateur WHERE id = ?', [id]);
        if (existingUser.length === 0) {
            return res.status(404).json({ error: "Utilisateur non trouvé" });
        }
        // Récupérer la nouvelle valeur pour le rôle (admin) depuis le corps de la requête
        const newAdminValue = req.body.admin;
        // Mettre à jour le rôle de l'utilisateur dans la base de données
        await req.dbConnection.execute('UPDATE utilisateur SET admin = ? WHERE id = ?', [newAdminValue, id]);
        // Envoyer une réponse de succès
        res.status(200).json({ message: "Rôle utilisateur mis à jour avec succès" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la mise à jour du rôle" });
    }
});


//Fait
// Route pour supprimer un utilisateur en fonction de son ID dans AdminUser.jsx
app.delete('/adminUser/:id', withDBConnection, async (req, res) => {
    const id = req.params.id;
    try {
        // Vérifier si l'utilisateur existe avant de le supprimer
        const [rows] = await req.dbConnection.execute('SELECT id FROM utilisateur WHERE id = ?', [id]);
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