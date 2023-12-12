import React, { useState, useEffect } from 'react';
import { Container, Card, ListGroup } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

export default function Produit() {
    const [product, setProduct] = useState(null);
    const { productId } = useParams(); // Utilisation de useParams directement
    console.log(productId)

    // Récupérer un produit en fonction de son ID
    const RecupProductById = async (productId) => {
        try {
            const reponse = await fetch(`http://localhost:8000/produit/${productId}`);
            const data = await reponse.json();
            setProduct(data);
        } catch (error) {
            console.log(error);
        }
    };
    console.log(process.env.PUBLIC_URL + `/images/produits/${productId}.png`)

    useEffect(() => {
        RecupProductById(productId); // Utilisation de la valeur directe de useParams
    }, [productId]); // Assurez-vous de déclarer id comme une dépendance pour useEffect

    return (
        <Container fluid="">
            <div>
                <h1>Détails du produit</h1>
                <p>ID du produit : {productId}</p>
                <Card className="d-flex align-items-center justify-content-center mb-2">
                    <Card.Img
                        variant="top"
                        src={process.env.PUBLIC_URL + `/images/produits/${productId}.png`}
                        alt={product?.nom}
                    />
                    <Card.Body>
                        <Card.Title>{product?.nom}</Card.Title>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Prix : {product?.prix} €</ListGroup.Item>
                            <ListGroup.Item>Quantité : {product?.quantite}</ListGroup.Item>
                            <ListGroup.Item>Description : {product?.description}</ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Card>
            </div>
        </Container>
    );
}
