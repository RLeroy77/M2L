import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, ListGroup, Form, Button } from 'react-bootstrap';
import '../style/Panier.css';

function Panier({ userId, isAdmin }) {
    const ls = localStorage;
    const [Panier, setPanier] = useState([]);
    console.log(userId)
    console.log(isAdmin)

    // Fonction pour mettre à jour la quantité dans le panier
    const handleValidation = async () => {
        try {
            const panier = ls.getItem('panier') ? JSON.parse(ls.getItem('panier')) : [];
            // Vérifier si le panier n'est pas vide
            if (panier.length > 0) {
                // Récupérer les informations nécessaires pour chaque produit dans le panier
                const produitsAUpdater = panier.map(item => ({
                    id: item.id,
                    quantite: item.quantite,
                }));
                console.log(produitsAUpdater)
                // Envoyer la requête PUT au backend avec les mises à jour
                const response = await fetch('http://localhost:8000/panier', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(produitsAUpdater),
                });
                const data = await response.json();
                console.log(data.message); // Affichez le message ou gérez la réponse de la manière qui vous convient
                ls.removeItem('panier');
                setPanier([]);
            } else {
                console.log("Le panier est vide.");
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const cart = ls.getItem('panier') ? JSON.parse(ls.getItem('panier')) : [];
        setPanier(cart);
    }, []);

    return (
        <Container>
            {userId === null ? (
                // Utilisateur connecté, afficher le panier
                <div>
                    <h1>Panier</h1>
                    {Panier.length > 0 ? (
                        <div>
                            <Card className='mb-2'>
                                <ListGroup>
                                    {Panier.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            Produit: {item.nom}, Quantité: {item.quantite}, Prix : {item.prix} €
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Card>
                            <Button className='btn-good' onClick={() => handleValidation()}>
                                Valider le panier
                            </Button>
                        </div>
                    ) : (
                        <p>Votre panier est vide.</p>
                    )}
                </div>
            ) : (
                // Utilisateur non connecté, afficher le message de connexion
                <p>Connectez-vous pour voir votre panier.</p>
            )}
        </Container>
    )
}

export default Panier