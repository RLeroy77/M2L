import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../style/Boutique.css';


function Boutique() {
    const baseUrl = 'http://10.74.1.151:8000';

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
                                        <Card.Img
                                            variant="top"
                                            src={process.env.PUBLIC_URL + `/images/produits/${product.id}.png`}
                                            alt={product.nom}
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