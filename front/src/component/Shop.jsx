import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, ListGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../style/Shop.css';


function Shop() {
    const [Product, setProduct] = useState([]);

    //Récuperer tous les produits 
    const RecupProduct = async () => {
        try {
            const reponse = await fetch('http://localhost:8000/produit')
            const data = await reponse.json();
            setProduct(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        RecupProduct();
    }, []);

    return (
        <Container fluid="">
            <Row>
                <Col className='m-3' xs={12}>
                    <h2>Liste des produits</h2>
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
                                            <Button className='btn-good' as={Link} to={`/Produit/${product.id}`}>
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

export default Shop;