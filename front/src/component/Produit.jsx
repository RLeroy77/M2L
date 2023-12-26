import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, ListGroup, Button, Table } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import '../style/Produit.css';

export default function Produit({ userId, isAdmin }) {
    const ls = localStorage;
    const { productId } = useParams(); // Utilisation de useParams directement
    const [product, setProduct] = useState(null);
    const [quantite, setQuantite] = useState(1);
    const [Panier, setPanier] = useState([]);

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

    const handleQuantiteChange = (e) => {
        // Mettre à jour la quantité lorsqu'elle change
        setQuantite(parseInt(e.target.value, 10));
    };
    /* Fonction pour ajouter au panier */
    const addToCart = () => {
        // Vérifier si le panier existe déjà dans le localStorage
        const cart = ls.getItem('panier') ? JSON.parse(ls.getItem('panier')) : [];
        // Vérifier si le produit est déjà dans le panier
        const existingProductIndex = cart.findIndex(item => item.id === productId);
        if (existingProductIndex !== -1) {
            // Le produit est déjà dans le panier, mettre à jour la quantité
            cart[existingProductIndex].quantite = quantite;
            // Mettre à jour le prix total en fonction de la nouvelle quantité
            cart[existingProductIndex].prixTotal = (quantite * product?.prix).toFixed(2);
        } else {
            // Le produit n'est pas encore dans le panier, l'ajouter
            const produitAjoute = {
                id: productId,
                quantite: quantite,
                nom: product?.nom,
                prixUni: product?.prix,
                prixTotal: (quantite * product?.prix).toFixed(2),
            };
            cart.push(produitAjoute);
        }
        // Mettre à jour le panier dans le localStorage
        ls.setItem('panier', JSON.stringify(cart));
        setPanier(cart);
    };



    useEffect(() => {
        const cart = ls.getItem('panier') ? JSON.parse(ls.getItem('panier')) : [];
        setPanier(cart);
        RecupProductById(productId); // Utilisation de la valeur directe de useParams
    }, [productId]); // Assurez-vous de déclarer id comme une dépendance pour useEffect

    return (
        <Container fluid="">
            <Row>
                <Col xs={12} md={6} className='mb-2'>
                    <h1>Détails du produit</h1>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top"
                            src={process.env.PUBLIC_URL + `/images/produits/${productId}.png`}
                            alt={product?.nom}
                            fluid="true"
                        />
                        <Card.Body>
                            <Card.Title>{product?.nom}</Card.Title>
                            <Card.Text>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>Prix unitaire : {product?.prix} €</ListGroup.Item>
                                    {product?.quantite > 0 && (
                                        <ListGroup.Item>Quantité disponible : {product?.quantite}</ListGroup.Item>
                                    )}
                                    {product?.quantite === 0 && (
                                        <ListGroup.Item style={{ color: 'red' }}>Rupture de stock</ListGroup.Item>
                                    )}
                                    <ListGroup.Item>Description : {product?.description}</ListGroup.Item>
                                </ListGroup>
                            </Card.Text>
                            {product?.quantite > 0 && (
                                <div>
                                    <Form.Group controlId="quantite">
                                        <Form.Label>Quantité :</Form.Label>
                                        <Form.Control
                                            as="select"
                                            value={quantite}
                                            onChange={handleQuantiteChange}
                                            className='mb-2'
                                        >
                                            {[...Array(product?.quantite).keys()].map((num) => (
                                                <option key={num + 1} value={num + 1}>
                                                    {num + 1}
                                                </option>
                                            ))}
                                        </Form.Control>
                                        <Button
                                            onClick={() => addToCart()}
                                            className='btn-good'>
                                            Ajouter au panier
                                        </Button>
                                    </Form.Group>
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={6}>
                    <h1>Panier</h1>
                    {Panier.length > 0 ? (
                        <React.Fragment>
                            <Table className='mt-2' responsive striped bordered hover variant="light">
                                <thead>
                                    <tr className="text-center">
                                        <th>Produit</th>
                                        <th>Quantité(s)</th>
                                        <th>Prix unitaire (en €)</th>
                                        <th>Prix total (en €)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Panier.map((item, index) => (
                                        <tr className="align-middle" key={index}>
                                            <td>{item.nom}</td>
                                            <td>{item.quantite}</td>
                                            <td>{item.prixUni}</td>
                                            <td>{item.prixTotal}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <Button
                                as={Link} to={'/panier'}
                                className='btn-good'>
                                Voir le panier
                            </Button>
                        </React.Fragment>
                    ) : (
                        <p>Votre panier est vide.</p>
                    )}
                </Col>
            </Row>
        </Container>
    );
}
