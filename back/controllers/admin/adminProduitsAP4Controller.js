const db = require('../../database/database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto')

//Route pour obtenir tous les produits dans 
exports.GetAllProduits = async (req, res) => {
    try {
        const [AllProduits] = await db.pool.execute(
            'SELECT id, nom, prix, quantite, description FROM produit_ap4'
        );
        res.status(200).json(AllProduits);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des produits" });
    }
};

// Route pour ajouter un produit utilisé dans 
exports.addProduit = async (req, res) => {
    try {
        const { nom, prix, quantite, description } = req.body;
        const id = crypto.randomUUID();
        const date_creation = new Date().toISOString().slice(0, 19).replace('T', ' ');
        await db.pool.execute(
            'INSERT INTO produit_ap4 (id, nom, prix, quantite, description, date_creation) VALUES (?, ?, ?, ?, ?, ?)',
            [id, nom, prix, quantite, description, date_creation]
        );
        res.status(200).json({ message: "Produit ajouté avec succès" });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de l'ajout d'un produit" });
    }
};

//Route pour modifier un produit en fonction de son id dans 
exports.editProduit = async (req, res) => {
    const id = req.params.id;
    try {
        // Vérifier si le produit existe avant de le mettre à jour
        const [existingProduct] = await db.pool.execute('SELECT id FROM produit_ap4 WHERE id = ?', [id]);
        if (existingProduct.length === 0) {
            return res.status(404).json({ error: "Produit non trouvé" });
        }
        // Produit trouvé, procéder à la mise à jour
        const { nom, prix, quantite, description } = req.body;
        // Construire la requête SQL dynamiquement en fonction des champs fournis
        let updateQuery = 'UPDATE produit_ap4 SET';
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

//Route pour supprimer un produit en fonction de son id dans 
exports.DeleteProduit = async (req, res) => {
    const id = req.params.id;
    try {
        // Vérifier si le produit existe avant de le supprimer
        const [rows] = await db.pool.execute('SELECT id FROM produit_ap4 WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: "Produit non trouvé" });
        }
        // Procéder à la suppression du produit dans la base de données
        await db.pool.execute('DELETE FROM produit_ap4 WHERE id = ?', [id]);
        // Supprimer le fichier image associé
        res.status(200).json({ message: "Produit supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la suppression du produit" });
    }
};



// Route pour la connexion utilisé dans 
exports.Connexion = async (req, res) => {
    const { user_name, mot_de_passe } = req.body;
    try {
        const [rows] = await db.pool.execute('SELECT id, mot_de_passe, admin FROM utilisateur WHERE user_name = ?', [user_name]);
        if (rows.length === 0) {
            return res.status(401).json({ error: "Nom d'utilisateur ou mot de passe incorrect" });
        }
        const hashedPassword = rows[0].mot_de_passe;
        const passwordMatch = await bcrypt.compare(mot_de_passe, hashedPassword);
        if (passwordMatch) {
            //Générer un token JWT valide et renvoyer au client
            const token = jwt.sign({ userId: rows[0].id, role: rows[0].admin }, process.env.API_KEY, { expiresIn: '1h' });
            res.status(200).json({ token, message: "Authentification réussie" });
        } else {
            res.status(401).json({ error: "Nom d'utilisateur ou mot de passe incorrect" });
        }
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de la connexion" });
    }
}