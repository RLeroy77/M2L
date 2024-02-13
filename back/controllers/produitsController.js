const db = require('../database/database');

//Route pour obtenir tous les produits dans AdminProduit.jsx et Boutique.jsx
exports.GetAllProduits = async (req, res) => {
    try {
        console.log("Lancement de la requête");
        const [rows , fields] = await db.pool.execute('SELECT id, nom, prix, quantite, description FROM produit');
        console.log(rows);
        res.status(200).json(rows);
    } catch (error) {
        console.log(error);
        res.status(500).send("Erreur lors de l'exécution de la requête");
    }
};

// Route pour obtenir un produit en fonction de son ID dans Produit.jsx
exports.GetProduitById = async (req, res) => {
    try {
        console.log("Lancement de la requête");
        const productId = req.params.id;
        const [rows] = await db.pool.execute(
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
};

//Route pour mettre à jour la quantité des produits lors de la validation du panier dans Panier.jsx
exports.EditProduitQuantite = async (req, res) => {
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
            const [produit] = await db.pool.execute('SELECT * FROM produit WHERE id = ?', [id]);
            if (!produit.length) {
                return res.status(404).json({ message: `Produit avec l'ID ${id} non trouvé.` });
            }
            const nouvelleQuantite = produit[0].quantite - quantite;
            if (nouvelleQuantite < 0) {
                return res.status(400).json({ message: `La quantité du produit ${id} ne peut pas devenir négative.` });
            }
            await db.pool.execute('UPDATE produit SET quantite = ? WHERE id = ?', [nouvelleQuantite, id]);
        }
        res.json({ message: 'Quantités des produits mises à jour avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour des quantités des produits.' });
    }
};