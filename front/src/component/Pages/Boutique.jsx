import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../style/Pages/Boutique.css';


function Boutique() {
    const baseUrl = 'http://192.168.1.230:8000';

    const [Product, setProduct] = useState([]);

    //Récuperer tous les produits 
    const RecupProduct = async () => {
        try {
            const reponse = await fetch(`${baseUrl}/api/produits/getAllProduits`)
            const data = await reponse.json();
            setProduct(data);
        } catch (error) {
            throw new Error(error);
        }
    };

    useEffect(() => {
        RecupProduct();
    }, []);

    return (
        <Container className='my-3'>
            <Row>
                <Col xs={12}>
                    <h1>Liste des produits</h1>
                    {Product.length > 0 ? (
                        <Row>
                            {Product.map((product) => (
                                <Col key={product.id} xs={12} md={6} lg={4} xxl={3}>
                                    <Card className="d-flex align-items-center justify-content-center mb-2">
                                        {/* Vérifie si l'image principale est chargée avec succès */}
                                        <img
                                            src={`${baseUrl}/images/${product.id}.png`}
                                            alt={product.nom}
                                            onError={(e) => {
                                                // Si l'image principale ne peut pas être chargée, utilise l'image par défaut
                                                e.target.onerror = null; // Pour éviter une boucle infinie
                                                e.target.src = `${baseUrl}/images/default_image.png`;
                                            }}
                                        />
                                        <Card.Body>
                                            <Card.Title>{product.nom}</Card.Title>
                                            <ListGroup variant="flush">
                                                <ListGroup.Item>Prix : {product.prix} €</ListGroup.Item>
                                            </ListGroup>
                                            <Button
                                                as={Link} to={`/Produit/${product.id}`}
                                                className='btn-good'>
                                                Voir détail
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    ) : (
                        <p>Pas de produit</p>
                    )}
                </Col>
            </Row>
        </Container >
    );
}

export default Boutique;