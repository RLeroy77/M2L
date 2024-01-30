const db = require('../database/database');

// Middleware pour gérer la connexion à la base de données
exports.WithDBConnection = async (req, res, next) => {
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

//Verif si tu es bien authentifié
exports.Authentificator = (req, res, next) => {
    const token = req.query.token ? req.query.token : req.headers.authorization;
    console.log(token);
    if (token && process.env.API_KEY) {
        jwt.verify(token, process.env.API_KEY, (err, decoded) => {
            if (err) {
                res.status(401).json({ error: 'Acces denide.' });
            } else {
                next();
            }
        })
    } else {
        res.status(401).json({ error: 'Acces denide.' });
    }
}

exports.CheckRole = async (req, res) => {
    const token = req.query.token ? req.query.token : req.headers.authorization;

    if (token && process.env.API_KEY) {
        jwt.verify(token, process.env.API_KEY, (err, decoded) => {
            if (err) {
                res.status(401).json({ error: 'Access denied.' });
            } else {
                const UserId = decoded.UserId;
                const [rows, fields] = db.pool.execute('SELECT admin FROM utilisateur WHERE id = ?', [UserId],)
                if (rows[0].admin) {
                    next();
                } else {
                    res.status(401).json({ error: 'Access denied.' });
                }
            }
        })
    } else {
        res.status(401).json({ error: 'Access denied.' });
    }
}



