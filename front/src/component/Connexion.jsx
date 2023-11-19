import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../style/Connexion.css'
// import { Route, Routes } from 'react-router-dom';

const InputField = ({ label, type, placeholder, value, onChange }) => {
    return (
        <Form.Group controlId={`form${label}`}>
            <Form.Label>{label}</Form.Label>
            <Form.Control type={type} placeholder={placeholder} value={value} onChange={onChange} />
        </Form.Group>
    );
};

function Connexion() {
    const [connexion, setConnexion] = useState([])
    const [affichage, setAffichage] = useState(false)
    const [error, setError] = useState('');
    //Nouveau state pour stocker les données de la création d'un utilisateur
    const [newUserData, setNewUserData] = useState({
        nom: "",
        prenom: "",
        user_name: "",
        mot_de_passe: "",
        confirmMotDePasse: '',
    })

    const recup = async () => {
        try {
            const reponse = await fetch("http://localhost:8000/utilisateur");
            const data = await reponse.json();
            console.log(data);
            setConnexion(data)
            setAffichage(true)
        } catch (error) {
            console.log(error);
        }
    }

    const validateFields = () => {
        const requiredFields = ['nom', 'prenom', 'user_name', 'mot_de_passe', 'confirmMotDePasse'];
        for (const field of requiredFields) {
            if (!newUserData[field]) {
                setError(`Veuillez remplir le champ ${field}.`);
                return false;
            }
        }
        if (newUserData.mot_de_passe !== newUserData.confirmMotDePasse) {
            setError('Les mots de passe ne correspondent pas.');
            return false;
        }
        setError('');
        return true;
    };

    const handleInputChange = (fieldName, value) => {
        setNewUserData({ ...newUserData, [fieldName]: value });
    };

    const handleAddUser = async () => {
        try {
            if (validateFields()) {
                const reponse = await fetch('http://localhost:8000/utilisateur', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        nom: newUserData.nom,
                        prenom: newUserData.prenom,
                        user_name: newUserData.user_name,
                        mot_de_passe: newUserData.mot_de_passe,
                    }),
                });

                if (reponse.ok) {
                    await reponse.json();
                    recup();
                    setNewUserData({
                        nom: '',
                        prenom: '',
                        user_name: '',
                        mot_de_passe: '',
                        confirmMotDePasse: '',
                    });
                } else {
                    console.error("Erreur lors de l'ajout de l'utilisateur :", reponse.statusText);
                }
            }
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'utilisateur :", error);
        }
    };

    useEffect(() => {
        recup()
    }, [])

    return (
        <Container fluid="">
            {affichage ? (
                <Row>
                    <Col xs={12} sm={6}>
                        <h2>Formulaire d'inscription</h2>
                        <Form>
                            <Row>
                                <Col className='mb-2' xs={12} md={6}>
                                    <InputField
                                        label="Nom"
                                        type="text"
                                        placeholder="Votre nom"
                                        value={newUserData.nom}
                                        onChange={(e) => handleInputChange('nom', e.target.value)}
                                    />
                                </Col>
                                <Col className='mb-2' xs={12} md={6}>
                                    <InputField
                                        label="Prénom"
                                        type="text"
                                        placeholder="Votre prénom"
                                        value={newUserData.prenom}
                                        onChange={(e) => handleInputChange('prenom', e.target.value)}
                                    />
                                </Col>
                                <Col className='mb-2' xs={12} md={6}>
                                    <InputField
                                        label="Nom d'utilisateur"
                                        type="text"
                                        placeholder="Votre nom d'utilisateur"
                                        value={newUserData.user_name}
                                        onChange={(e) => handleInputChange('user_name', e.target.value)}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col className='mb-2' xs={12} md={6}>
                                    <InputField
                                        label="Mot de passe"
                                        type="password"
                                        placeholder="Votre mot de passe"
                                        value={newUserData.mot_de_passe}
                                        onChange={(e) => handleInputChange('mot_de_passe', e.target.value)}
                                    />
                                </Col>
                                <Col className='mb-2' xs={12} md={6}>
                                    <InputField
                                        label="Confirmer le mot de passe"
                                        type="password"
                                        placeholder="Confirmer votre mot de passe"
                                        value={newUserData.confirmMotDePasse}
                                        onChange={(e) => handleInputChange('confirmMotDePasse', e.target.value)}
                                    />
                                </Col>
                            </Row>
                            <Button className='btn-good' onClick={handleAddUser}>Ajouter</Button>
                            {error && <p className='error'>{error}</p>}
                        </Form>
                    </Col>

                    <Col xs={12} sm={6}>
                        <h2>Formulaire de connexion</h2>
                        <Form>
                            {/* Faire le Formulaire de connexion */}
                        </Form>
                    </Col>
                </Row>
            ) : (
                <p>Pas d'utilisateur</p>
            )}
        </Container>
    );
}

export default Connexion;