import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
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

function Connexion(userId, setUserId, isAdmin, setIsAdmin, userName, setUserName) {
    localStorage.clear();
    const ls = localStorage;
    const navigate = useNavigate();
    const [errorInscription, setErrorInscription] = useState('');
    const [errorConnexion, setErrorConnexion] = useState('');
    const [valideInscription, setValideInscription] = useState('');
    const [valideConnexion, setValideConnexion] = useState('');

    // État pour le formulaire d'inscription
    const [newUserDataInscription, setNewUserDataInscription] = useState({
        nom: "",
        prenom: "",
        user_name: "",
        mot_de_passe: "",
        confirmMotDePasse: '',
    });

    // État pour le formulaire de connexion
    const [newUserDataConnexion, setNewUserDataConnexion] = useState({
        user_name: "",
        mot_de_passe: "",
    });

    // Partie du formulaire d'inscription
    const validateFieldsInscription = () => {
        const requiredFields = ['nom', 'prenom', 'user_name', 'mot_de_passe', 'confirmMotDePasse'];
        for (const field of requiredFields) {
            if (!newUserDataInscription[field]) {
                setErrorInscription(`Veuillez remplir le champ ${field}.`);
                setTimeout(() => setErrorInscription(''), 5000);
                return false;
            }
        }
        if (newUserDataInscription.mot_de_passe !== newUserDataInscription.confirmMotDePasse) {
            setErrorInscription('Les mots de passe ne correspondent pas.');
            setTimeout(() => setErrorInscription(''), 5000);
            return false;
        }
        setErrorInscription('');
        return true;
    };

    const handleInputChangeInscription = (fieldName, value) => {
        setNewUserDataInscription({ ...newUserDataInscription, [fieldName]: value });
    };

    const handleAddUser = async () => {
        try {
            if (validateFieldsInscription()) {
                const reponse = await fetch('http://localhost:8000/utilisateur', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        nom: newUserDataInscription.nom,
                        prenom: newUserDataInscription.prenom,
                        user_name: newUserDataInscription.user_name,
                        mot_de_passe: newUserDataInscription.mot_de_passe,
                    }),
                });

                if (reponse.ok) {
                    setValideInscription('Utilisateur ajouté avec succès');
                    setNewUserDataInscription({
                        nom: '',
                        prenom: '',
                        user_name: '',
                        mot_de_passe: '',
                        confirmMotDePasse: '',
                    });
                    setTimeout(() => setValideInscription(''), 5000);
                } else {
                    console.error("Erreur lors de l'ajout de l'utilisateur :", reponse.statusText);
                    setErrorInscription("Erreur lors de l'ajout de l'utilisateur : " + reponse.statusText);
                    setTimeout(() => setErrorInscription(''), 5000);
                }
            }
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'utilisateur :", error);
            setErrorInscription("Erreur lors de l'ajout de l'utilisateur : " + error);
            setTimeout(() => setErrorInscription(''), 5000);
        }
    };


    // Partie du formulaire de connexion
    const handleInputChangeConnexion = (fieldName, value) => {
        setNewUserDataConnexion({ ...newUserDataConnexion, [fieldName]: value });
    };

    const handleConnexion = async () => {
        try {
            const response = await fetch('http://localhost:8000/connexion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_name: newUserDataConnexion.user_name,
                    mot_de_passe: newUserDataConnexion.mot_de_passe,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setValideConnexion('Connexion réussie !');
                console.log('Utilisateur authentifié avec succès', data.userId, data.isAdmin);
                // Stocker dans localStorage
                ls.setItem('userId', data.userId);
                ls.setItem('isAdmin', data.isAdmin);
                // A changer c'est pas bien 
                setTimeout(() => window.location.reload(), 100);
                navigate("/shop")

            } else {
                console.error("Erreur lors de la connexion :", response.statusText);
                setErrorConnexion("Nom d'utilisateur ou mot de passe incorrect");
                setTimeout(() => setErrorConnexion(''), 5000);
            }
        } catch (error) {
            console.error("Erreur lors de la connexion :", error);
            setErrorConnexion("Erreur lors de la connexion : " + error);
            setTimeout(() => setErrorConnexion(''), 5000);
        }
    };

    useEffect(() => {
    }, []);

    return (
        <Container fluid="">
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
                                    value={newUserDataInscription.nom}
                                    onChange={(e) => handleInputChangeInscription('nom', e.target.value)}
                                />
                            </Col>
                            <Col className='mb-2' xs={12} md={6}>
                                <InputField
                                    label="Prénom"
                                    type="text"
                                    placeholder="Votre prénom"
                                    value={newUserDataInscription.prenom}
                                    onChange={(e) => handleInputChangeInscription('prenom', e.target.value)}
                                />
                            </Col>
                            <Col className='mb-2' xs={12} md={6}>
                                <InputField
                                    label="Nom d'utilisateur"
                                    type="text"
                                    placeholder="Votre nom d'utilisateur"
                                    value={newUserDataInscription.user_name}
                                    onChange={(e) => handleInputChangeInscription('user_name', e.target.value)}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col className='mb-2' xs={12} md={6}>
                                <InputField
                                    label="Mot de passe"
                                    type="password"
                                    placeholder="Votre mot de passe"
                                    value={newUserDataInscription.mot_de_passe}
                                    onChange={(e) => handleInputChangeInscription('mot_de_passe', e.target.value)}
                                />
                            </Col>
                            <Col className='mb-2' xs={12} md={6}>
                                <InputField
                                    label="Confirmer le mot de passe"
                                    type="password"
                                    placeholder="Confirmer votre mot de passe"
                                    value={newUserDataInscription.confirmMotDePasse}
                                    onChange={(e) => handleInputChangeInscription('confirmMotDePasse', e.target.value)}
                                />
                            </Col>
                        </Row>
                        <Button className='btn-good' onClick={handleAddUser}>Ajouter</Button>
                        {errorInscription && <p className='error'>{errorInscription}</p>}
                        {valideInscription && <p className='success'>{valideInscription}</p>}
                    </Form>
                </Col>

                <Col xs={12} sm={6}>
                    <h2>Formulaire de connexion</h2>
                    <Form>
                        <Row>
                            <Col className='mb-2' xs={12} md={6}>
                                <InputField
                                    label="Nom d'utilisateur"
                                    type="text"
                                    placeholder="Votre nom d'utilisateur"
                                    value={newUserDataConnexion.user_name}
                                    onChange={(e) => handleInputChangeConnexion('user_name', e.target.value)}
                                />
                            </Col>
                            <Col className='mb-2' xs={12} md={6}>
                                <InputField
                                    label="Mot de passe"
                                    type="password"
                                    placeholder="Votre mot de passe"
                                    value={newUserDataConnexion.mot_de_passe}
                                    onChange={(e) => handleInputChangeConnexion('mot_de_passe', e.target.value)}
                                />
                            </Col>
                        </Row>
                        <Button className='btn-good' onClick={handleConnexion}>Connexion</Button>
                        {errorConnexion && <p className='error'>{errorConnexion}</p>}
                        {valideConnexion && <p className='success'>{valideConnexion}</p>}
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Connexion;
