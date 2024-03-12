const db = require('../database/database');

//Route pour obtenir tous les produits dans AdminProduit.jsx et Boutique.jsx
exports.GetAllProduits = async (req, res) => {
    try {
        const [AllProduits] = await db.pool.execute(
            'SELECT id, nom, prix, quantite, description FROM produit'
        );
        console.log(AllProduits);
        res.status(200).json(AllProduits);
    } catch (error) {
        console.log(error);
        res.status(500).send("Erreur lors de l'exécution de la requête");
    }
};

// Route pour obtenir un produit en fonction de son ID dans Produit.jsx
exports.GetProduitById = async (req, res) => {
    try {
        const productId = req.params.id;
        const [Produit] = await db.pool.execute(
            'SELECT id, nom, prix, quantite, description FROM produit WHERE id = ?',
            [productId]
        );
        if (Produit.length === 0) {
            res.status(404).json({ message: 'Produit non trouvé' });
        } else {
            const product = Produit[0];
            res.status(200).json(product);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Erreur lors de l'exécution de la requête");
    }
};

//Route pour mettre à jour la quantité du produit lors de la validation du panier dans Panier.jsx
exports.EditProduitQuantite = async (req, res) => {
    try {
        const { id_utilisateur, id_produit, quantite } = req.body;
        if (!id_utilisateur || !id_produit || !quantite) {
            return res.status(400).json({ message: "L'ID utilisateur et/ou l'ID produit et/ou la quantité ne sont pas fournis pour un élément du panier." });
        }
        const [produit] = await db.pool.execute(
            'SELECT * FROM produit WHERE id = ?',
            [id_produit]
        );
        if (!produit.length) {
            return res.status(404).json({ message: `Produit avec l'ID ${id_produit} non trouvé.` });
        }
        const nouvelleQuantite = produit[0].quantite - quantite;
        if (nouvelleQuantite < 0) {
            return res.status(400).json({ message: `La quantité du produit ${id_produit} ne peut pas devenir négative.` });
        }
        await db.pool.execute(
            'UPDATE produit SET quantite = ? WHERE id = ?',
            [nouvelleQuantite, id_produit]
        );
        res.status(200).json({ message: 'Quantité du produit mise à jour avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la mise à jour de la quantité du produit.' });
    }
};