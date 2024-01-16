import React, { useState, useEffect, useMemo } from 'react';
import { Container, Row, Col, Button, Alert, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import '../style/Panier.css';

function Panier({ userId }) {
    const ls = useMemo(() => localStorage, []);
    const [Panier, setPanier] = useState([]);
    const [errorValidation, setErrorValidation] = useState('');
    const [valideValidation, setValideValidation] = useState('');

    // Fonction pour mettre à jour la quantité dans le panier
    const handleValidation = async () => {
        try {
            // Vérifier si l'utilisateur est connecté
            if (!userId) {
                setErrorValidation("Veuillez-vous connecter ou vous inscrire pour valider le panier.");
                setTimeout(() => setErrorValidation(''), 5000);
                console.log("Veuillez-vous connecter ou vous inscrire pour valider le panier.");
                return;
            }
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
                ls.removeItem('panier');
                setPanier([]);
                console.log(data.message);
                setValideValidation("Commande effectuée avec succès.");
                setTimeout(() => setValideValidation(''), 5000);
            } else {
                console.log("Le panier est vide.");
            }
        } catch (error) {
            console.error(error);
        }
    };

    // Fonction pour supprimer un élément du panier
    const removeFromCart = (productId) => {
        try {
            const cart = ls.getItem('panier') ? JSON.parse(ls.getItem('panier')) : [];

            // Trouver l'index de l'élément à supprimer
            const indexToRemove = cart.findIndex(item => item.id === productId);

            if (indexToRemove !== -1) {
                // Modifier directement le panier dans le localStorage en supprimant l'élément
                cart.splice(indexToRemove, 1);
                ls.setItem('panier', JSON.stringify(cart));
                setPanier([...cart]); // Mettre à jour l'état local avec le panier modifié
            }
        } catch (error) {
            console.error(error);
        }
    };

    // Fonction pour calculer le total de la quantité et le total du prix
    const calculateTotals = () => {
        const totalQuantite = Panier.reduce((total, item) => total + item.quantite, 0);
        // Utilise parseFloat pour convertir les prixTotal en nombres
        const totalPrice = Panier.reduce((total, item) => total + parseFloat(item.prixTotal), 0);
        // Utilise toFixed(2) pour formater le résultat avec deux chiffres après la virgule
        const formattedTotalPrice = totalPrice.toFixed(2);
        return { totalQuantite, totalPrice: formattedTotalPrice };
    };

    const { totalQuantite, totalPrice } = calculateTotals();



    useEffect(() => {
        const cart = ls.getItem('panier') ? JSON.parse(ls.getItem('panier')) : [];
        setPanier(cart);
    }, [ls]);


    return (
        <Container className='my-3'>
            <Row>
                <Col xs={12}>
                    <h1>Panier</h1>
                    {valideValidation && <h3 className='success'>{valideValidation}</h3>}
                    {errorValidation && <Alert variant="danger">
                        <p>{errorValidation}</p>
                        <Button
                            as={Link} to={'/InscriptionConnexion'}
                            className='btn-delete'>
                            Connexion/Inscription
                        </Button>
                    </Alert>}
                    {Panier.length > 0 ? (
                        <React.Fragment>
                            <Table className='mt-2' responsive striped bordered hover variant="light">
                                <thead>
                                    <tr className="text-center">
                                        <th>Produit</th>
                                        <th>Prix unitaire (en €)</th>
                                        <th>Quantité(s)</th>
                                        <th>Prix (en €)</th>
                                        <th>Interaction</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Panier.map((item, index) => (
                                        <tr className="align-middle" key={index}>
                                            <td>{item.nom}</td>
                                            <td className="text-center">{item.prixUni}</td>
                                            <td className="text-center">{item.quantite}</td>
                                            <td className="text-center">{item.prixTotal}</td>
                                            <td className="text-center">
                                                <Button size='sm'
                                                    className='btn-delete m-2'
                                                    onClick={() => removeFromCart(item.id)}
                                                >
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan={5}></td>
                                    </tr>
                                    <tr className="text-center">
                                        <td colSpan="3"></td>
                                        <th>Quantité(s) total</th>
                                        <td>{totalQuantite}</td>
                                    </tr>
                                    <tr className="text-center">
                                        <td colSpan="3"></td>
                                        <th>Prix Total (en €)</th>
                                        <td>{totalPrice}</td>
                                    </tr>
                                </tfoot>
                            </Table>
                            <div className="d-flex justify-content-end">
                                <Button
                                    onClick={() => handleValidation()}
                                    className='btn-good'>
                                    Valider le panier
                                </Button>
                            </div>
                        </React.Fragment>
                    ) : (
                        <p>Votre panier est vide.</p>
                    )}
                </Col>
            </Row>
        </Container>
    )
}

export default Panier;
