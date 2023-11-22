import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../style/Connexion.css';

const InputField = ({ label, type, placeholder, value, onChange }) => {
    return (
        <Form.Group controlId={`form${label}`}>
            <Form.Label>{label}</Form.Label>
            <Form.Control type={type} placeholder={placeholder} value={value} onChange={onChange} />
        </Form.Group>
    );
};

function AddProduit(userId, setUserId, isAdmin, setIsAdmin, userName, setUserName) {

    const [errorProduct, setErrorProduct] = useState('');
    const [valideProduct, setValideProduct] = useState('');

    const [newDataProduct, setNewDataProduct] = useState({
        nom: "",
        prix: "",
        quantite: "",
        description: "",
    });

    const validateFieldsProduct = () => {
        const requiredFields = ['nom', 'prix', 'quantite', 'description'];
        for (const field of requiredFields) {
            if (!newDataProduct[field]) {
                setErrorProduct(`Veuillez remplir le champ ${field}.`);
                setTimeout(() => setErrorProduct(''), 5000);
                return false;
            }
        }
        setErrorProduct('');
        return true;
    }

    const handleInputChangeProduct = (fieldName, value) => {
        setNewDataProduct({ ...newDataProduct, [fieldName]: value });
    };

    const handlAddProduct = async () => {
        try {
            if (validateFieldsProduct()) {
                const reponse = await fetch('http://localhost:8000/produit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        nom: newDataProduct.nom,
                        prix: newDataProduct.prix,
                        quantite: newDataProduct.quantite,
                        description: newDataProduct.description,
                    }),
                });

                if (reponse.ok) {
                    setValideProduct('Produit ajouté avec succès');
                    setNewDataProduct({
                        nom: "",
                        prix: "",
                        quantite: "",
                        description: "",
                    });
                    setTimeout(() => setValideProduct(''), 5000);
                } else {
                    console.error("Erreur lors de l'ajout d'un produit :", reponse.statusText);
                    setErrorProduct("Erreur lors de l'ajout d'un produit : " + reponse.statusText);
                    setTimeout(() => setErrorProduct(''), 5000);
                }
            }
        } catch (error) {
            console.error("Erreur lors de l'ajout d'un produit :", error);
            setErrorProduct("Erreur lors de l'ajout d'un produit : " + error);
            setTimeout(() => setErrorProduct(''), 5000);
        }
    }

    return (
        <Container fluid="">
            <h2>Formulaire d'ajout de produit</h2>
            <Form>
                <Row>
                    <Col className='mb-2' xs={12} mb={6}>
                        <InputField
                            label="Nom"
                            type="text"
                            placeholder="Nom du produit"
                            value={newDataProduct.nom}
                            onChange={(e) => handleInputChangeProduct('nom', e.target.value)}
                        />
                    </Col>
                    <Col className='mb-2' xs={12} mb={6}>
                        <InputField
                            label="Prix"
                            type="text"
                            placeholder="Prix du produit"
                            value={newDataProduct.prix}
                            onChange={(e) => handleInputChangeProduct('prix', e.target.value)}
                        />
                    </Col>
                    <Col className='mb-2' xs={12} mb={6}>
                        <InputField
                            label="Quantité"
                            type="text"
                            placeholder="Quantité du produit"
                            value={newDataProduct.quantite}
                            onChange={(e) => handleInputChangeProduct('quantite', e.target.value)}
                        />
                    </Col>
                    <Col className='mb-2' xs={12} mb={6}>
                        <InputField
                            label="Description"
                            type="text"
                            placeholder="Description du produit"
                            value={newDataProduct.description}
                            onChange={(e) => handleInputChangeProduct('description', e.target.value)}
                        />
                    </Col>
                </Row>
                <Button className='btn-good' onClick={handlAddProduct}>Ajouter</Button>
                {errorProduct && <p className='error'>{errorProduct}</p>}
                {valideProduct && <p className='success'>{valideProduct}</p>}
            </Form>
        </Container>
    )
};

export default AddProduit;