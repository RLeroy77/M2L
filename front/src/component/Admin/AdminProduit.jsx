import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, ListGroup } from 'react-bootstrap';
import Cookies from 'js-cookie';
import CreateProduit from '../Form/CreateProduitForm';
import '../../style/Admin/AdminProduit.css';

function AdminProduit({ isAdmin }) {
    const baseUrl = 'http://10.74.1.151:8000';

    const [Product, setProduct] = useState([]);

    const [selectedProductId, setSelectedProductId] = useState(null);

    //Pour l'édition
    const [errorEdit, setErrorEdit] = useState('');
    const [valideEdit, setValideEdit] = useState('');
    const [editDataProduct, setEditDataProduct] = useState({
        nom: "",
        prix: "",
        quantite: "",
        description: "",
    });

    //Pour la suppression
    const [errorDelete, setErrorDelete] = useState('');
    const [valideDelete, setValideDelete] = useState('');


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

    //Début partie modif
    // Gére les changements d'entrée dans le formulaire de modification et de maintenir l'état du formulaire à jour en fonction des modifications de l'utilisateur
    const handleInputChangeEditProduct = (fieldName, value) => {
        setEditDataProduct({ ...editDataProduct, [fieldName]: value });
    };

    // Vérifie si au moins un champ du formulaire d'ajout est rempli
    const validateFieldsEditProduct = (data) => {
        const filledFields = Object.keys(data).filter((field) => data[field]);
        if (filledFields.length === 0) {
            setErrorEdit('Veuillez remplir au moins un champ.');
            setTimeout(() => setErrorEdit(''), 2500);
            return false;
        }
        setErrorEdit('');
        return true;
    };

    // Fonction pour gérer la soumission du formulaire de modification
    const handleEditProduct = async () => {
        try {
            if (validateFieldsEditProduct(editDataProduct)) {
                const requestBody = {};
                // Ajoute uniquement les champs modifiés au corps de la requête
                if (editDataProduct.nom) requestBody.nom = editDataProduct.nom;
                if (editDataProduct.prix) requestBody.prix = editDataProduct.prix;
                if (editDataProduct.quantite) requestBody.quantite = editDataProduct.quantite;
                if (editDataProduct.description) requestBody.description = editDataProduct.description;

                const editProductResponse = await fetch(`${baseUrl}/api/adminProduits/editProduit/${selectedProductId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': Cookies.get('token'),
                    },
                    body: JSON.stringify(requestBody),
                });

                if (editProductResponse.ok) {
                    setValideEdit('Produit modifié avec succès');
                    RecupProduct();
                    // setSelectedProductId(null);
                    setEditDataProduct({
                        nom: "",
                        prix: "",
                        quantite: "",
                        description: "",
                    });
                    setTimeout(() => setValideEdit(''), 2500);
                } else {
                    setErrorEdit("Erreur lors de la modification du produit : " + editProductResponse.statusText);
                    setTimeout(() => setErrorEdit(''), 2500);
                }
            }
        } catch (error) {
            setErrorEdit("Erreur lors de la modification du produit : " + error);
            setTimeout(() => setErrorEdit(''), 2500);
        }
    };

    // Fonction pour afficher le formulaire de modification
    const showEditForm = (productId) => {
        // Mettre à jour l'ID du produit sélectionné
        setSelectedProductId(productId);
        // Mettre à jour les données du formulaire de modification avec des valeurs vides
        setEditDataProduct({
            nom: "",
            prix: "",
            quantite: "",
            description: "",
        });
    };

    // Fonction pour annuler la modification et fermer le formulaire
    const cancelEdit = () => {
        setSelectedProductId(null);
        setEditDataProduct({
            nom: "",
            prix: "",
            quantite: "",
            description: "",
        });
    };
    //Fin partie modif



    //Début partie Suppression
    const handleDeleteProduct = async (selectedProductId) => {
        try {
            const deleteProductResponse = await fetch(`${baseUrl}/api/adminProduits/deleteProduit/${selectedProductId}`, {
                method: 'DELETE',
                headers: {
                    'authorization': Cookies.get('token'),
                },
            });

            if (deleteProductResponse.ok) {
                const updatedProductList = Product.filter((product) => product.id !== selectedProductId);
                setProduct(updatedProductList);
                setValideDelete('Produit supprimé avec succès');
                setTimeout(() => setValideDelete(''), 2500);
            } else {
                setErrorDelete("Erreur lors de la suppression du produit : " + deleteProductResponse.statusText);
                setTimeout(() => setErrorDelete(''), 2500);
            }
        } catch (error) {
            setErrorDelete("Erreur lors de la suppression du produit : " + error);
            setTimeout(() => setErrorDelete(''), 2500);
        }
    };
    //Fin partie Suppression

    useEffect(() => {
        RecupProduct();
    }, []);

    return (
        <Container fluid="">
            {isAdmin === 1 ? (
                <Row>

                    <CreateProduit />

                    <Col className='m-3' xs={12}>
                        <h2>Liste des produits</h2>
                        {errorDelete && <p className='error'>{errorDelete}</p>}
                        {valideDelete && <p className='success'>{valideDelete}</p>}
                        {Product.length > 0 ? (
                            <Row>
                                {Product.map((product) => (
                                    <Col key={product.id} xs={12} md={6} lg={4} xxl={3}>
                                        <Card className="d-flex align-items-center justify-content-center mb-2">
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
                                                    <ListGroup.Item>Quantité : {product.quantite}</ListGroup.Item>
                                                    <ListGroup.Item>Description : {product.description}</ListGroup.Item>
                                                </ListGroup>
                                                <Button
                                                    className='btn-good m-2'
                                                    onClick={() => showEditForm(product.id)}
                                                >Modifier
                                                </Button>
                                                <Button
                                                    className='btn-delete m-2'
                                                    onClick={() => handleDeleteProduct(product.id)}
                                                >Supprimer
                                                </Button>
                                                {selectedProductId === product.id && (
                                                    <Form>
                                                        <Row>
                                                            <Col className='mb-2' xs={12}>
                                                                <Form.Group controlId="EditProduitForm.Nom">
                                                                    <Form.Label>Nom</Form.Label>
                                                                    <Form.Control
                                                                        type="text"
                                                                        placeholder="Nom du produit"
                                                                        value={editDataProduct.nom}
                                                                        onChange={(e) => handleInputChangeEditProduct('nom', e.target.value)}
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col className='mb-2' xs={12}>
                                                                <Form.Group controlId="EditProduitForm.Prix">
                                                                    <Form.Label>Prix</Form.Label>
                                                                    <Form.Control
                                                                        type="number"
                                                                        placeholder="Prix du produit"
                                                                        value={editDataProduct.prix}
                                                                        onChange={(e) => handleInputChangeEditProduct('prix', e.target.value)}
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col className='mb-2' xs={12}>
                                                                <Form.Group controlId="EditProduitForm.Quantite">
                                                                    <Form.Label>Quantité</Form.Label>
                                                                    <Form.Control
                                                                        type="number"
                                                                        placeholder="Quantité du produit"
                                                                        value={editDataProduct.quantite}
                                                                        onChange={(e) => handleInputChangeEditProduct('quantite', e.target.value)}
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col className='mb-2' xs={12}>
                                                                <Form.Group controlId="EditProduitForm.Description">
                                                                    <Form.Label>Description</Form.Label>
                                                                    <Form.Control
                                                                        type="text"
                                                                        placeholder="Description du produit"
                                                                        value={editDataProduct.description}
                                                                        onChange={(e) => handleInputChangeEditProduct('description', e.target.value)}
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                                                        <Button className='btn-delete m-2' onClick={cancelEdit}>Annuler</Button>
                                                        <Button className='btn-good m-2' onClick={handleEditProduct}>Enregister</Button>
                                                        {errorEdit && <p className='error'>{errorEdit}</p>}
                                                        {valideEdit && <p className='success'>{valideEdit}</p>}
                                                    </Form>
                                                )}
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
            ) : (
                <Row>
                    <Col>
                        <h2>Accès non autorisé</h2>
                    </Col>
                </Row>
            )}
        </Container>
    )
};

export default AdminProduit;