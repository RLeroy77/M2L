import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Row, Col, Form, Button } from 'react-bootstrap';
import Cookies from 'js-cookie';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import '../../style/InscriptionConnexion.css';

function ConnexionForm() {
    const baseUrl = 'http://localhost:8000';
    const navigate = useNavigate();
    const [errorConnexion, setErrorConnexion] = useState('');
    const [valideConnexion, setValideConnexion] = useState('');

    const schema = yup.object({
        user_name: yup
            .string()
            .max(50, "Le nom d'utilisateur ne doit pas dépasser 50 caractères")
            .required("Veuillez entrer votre nom d'utilisateur"),
        mot_de_passe: yup
            .string()
            .required("Veuillez entrer votre mot de passe"),
    }).required();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const handleConnexion = async (data) => {
        try {
            await schema.validate(data, { abortEarly: false });

            const response = await fetch(`${baseUrl}/api/inscriptionConnexion/connexion`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_name: data.user_name,
                    mot_de_passe: data.mot_de_passe,
                }),
            });

            if (response.ok) {
                const responseData = await response.json();
                setValideConnexion('Connexion réussie !');
                Cookies.set('token', responseData.token, { expires: 1, secure: true, sameSite: 'strict' });
                setTimeout(() => window.location.reload(), 100);
                navigate('/');
            } else {
                console.error("Erreur lors de la connexion :", response.statusText);
                setErrorConnexion("Nom d'utilisateur ou mot de passe incorrect");
                setTimeout(() => setErrorConnexion(''), 5000);
            }
        } catch (error) {
            console.error("Erreur lors de la connexion :", error);
            setErrorConnexion("Erreur lors de la connexion : " + error.message);
            setTimeout(() => setErrorConnexion(''), 5000);
        }
    };

    return (
        <Col xs={12} sm={6}>
            <h2>Formulaire de connexion</h2>
            <Form onSubmit={handleSubmit(handleConnexion)}>
                <Row>
                    <Col className='mb-2' xs={12} md={6}>
                        <Form.Group className='mb-3' controlId='ConnexionForm.User_name'>
                            <Form.Label>Nom d'utilisateur</Form.Label>
                            <Form.Control
                                type='text'
                                name='user_name'
                                {...register("user_name")}
                            />
                            {errors.user_name && (
                                <p className='error'>{errors.user_name.message}</p>
                            )}
                        </Form.Group>
                    </Col>
                    <Col className='mb-2' xs={12} md={6}>
                        <Form.Group controlId="ConnexionForm.Password">
                            <Form.Label>Mot de passe</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Votre mot de passe"
                                {...register('mot_de_passe')}
                            />
                            {errors.mot_de_passe && (
                                <p className='error'>{errors.mot_de_passe.message}</p>
                            )}
                        </Form.Group>
                    </Col>
                </Row>
                <Button className='btn-good' type="submit">
                    Connexion
                </Button>
                {errorConnexion && <p className='error'>{errorConnexion}</p>}
                {valideConnexion && <p className='success'>{valideConnexion}</p>}
            </Form>
        </Col>
    )
}

export default ConnexionForm;
