const db = require('../../database/database');
const sharp = require('sharp');
const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');

// Route pour ajouter un produit utilisé dans AdminProduit.jsx
exports.AddProduit = async (req, res) => {
    try {
        const { nom, prix, quantite, description } = req.body;
        const id = crypto.randomUUID();
        const date_creation = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const image = req.file;
        // Utiliser sharp pour redimensionner l'image
        const resizedImagePath = path.join(__dirname, '../../images', `${id}.png`);
        await sharp(image.path).resize(300, 200).toFile(resizedImagePath);
        // Supprimer l'image d'origine après redimensionnement
        await fs.unlink(image.path);
        await db.pool.execute(
            'INSERT INTO produit (id, nom, prix, quantite, description, date_creation) VALUES (?, ?, ?, ?, ?, ?)',
            [id, nom, prix, quantite, description, date_creation]
        );
        res.status(200).json({ message: "Produit ajouté avec succès" });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de l'ajout d'un produit" });
    }
};

// Route pour ajouter un produit utilisé dans l'application mobile
exports.AddProduitFlutter = async (req, res) => {
    try {
        const { nom, prix, quantite, description } = req.body;
        const id = crypto.randomUUID();
        const date_creation = new Date().toISOString().slice(0, 19).replace('T', ' ');
        await db.pool.execute(
            'INSERT INTO produit (id, nom, prix, quantite, description, date_creation) VALUES (?, ?, ?, ?, ?, ?)',
            [id, nom, prix, quantite, description, date_creation]
        );
        res.status(200).json({ message: "Produit ajouté avec succès" });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de l'ajout d'un produit" });
    }
};

//Route pour modifier un produit en fonction de son id dans AdminProduit.jsx
exports.EditProduit = async (req, res) => {
    const id = req.params.id;
    try {
        // Vérifier si le produit existe avant de le mettre à jour
        const [existingProduct] = await db.pool.execute('SELECT id FROM produit WHERE id = ?', [id]);
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
        await db.pool.execute(updateQuery, updateValues);
        res.status(200).json({ message: "Produit mis à jour avec succès" });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la mise à jour du produit" });
    }
};

//Route pour supprimer un produit en fonction de son id dans AdminProduit.jsx
exports.DeleteProduit = async (req, res) => {
    const id = req.params.id;
    const imagePath = path.join(__dirname, '../../images', `${id}.png`);
    const imageUrl = `http://localhost:8000/images/${id}.png`;
    try {
        // Vérifier si le produit existe avant de le supprimer
        const [rows] = await db.pool.execute('SELECT id FROM produit WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: "Produit non trouvé" });
        }
        // Vérifier si l'image associée existe
        const response = await fetch(imageUrl, { method: 'HEAD' });
        if (response.ok) {
            // Supprimer l'image associée si elle existe
            await fs.unlink(imagePath);
        }
        // Procéder à la suppression du produit dans la base de données
        await db.pool.execute('DELETE FROM produit WHERE id = ?', [id]);

        res.status(200).json({ message: "Produit supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la suppression du produit" });
    }
};
