import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import '../../style/Form/InscriptionConnexion.css';

function InscriptionForm() {
    const baseUrl = 'http://192.168.1.230:8000';
    const [errorInscription, setErrorInscription] = useState('');
    const [valideInscription, setValideInscription] = useState('');

    const schema = yup.object({
        nom: yup
            .string()
            .max(50, "Le nom ne doit pas dépasser 50 caractères")
            .required("Veuillez entrer votre nom"),
        prenom: yup
            .string()
            .max(50, "Le prénom ne doit pas dépasser 50 caractères")
            .required("Veuillez entrer votre prénom"),
        user_name: yup
            .string()
            .max(50, "Le nom d'utilisateur ne doit pas dépasser 50 caractères")
            .required("Veuillez entrer votre nom d'utilisateur"),
        mot_de_passe: yup
            .string()
            .min(8, "Le mot de passe doit contenir au moins 8 caractères")
            .required("Veuillez entrer votre mot de passe"),
        confirmMotDePasse: yup.string()
            .oneOf([yup.ref('mot_de_passe'), null], 'Les mots de passe ne correspondent pas')
            .required('Veuillez confirmer votre mot de passe'),
    }).required();

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const handleInscription = async (data) => {
        try {
            await schema.validate(data, { abortEarly: false });

            const response = await fetch(`${baseUrl}/api/inscriptionConnexion/inscription`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nom: data.nom,
                    prenom: data.prenom,
                    user_name: data.user_name,
                    mot_de_passe: data.mot_de_passe,
                }),
            });

            if (response.ok) {
                setValideInscription('Utilisateur ajouté avec succès');
                reset();
                setTimeout(() => setValideInscription(''), 5000);
            } else {
                setErrorInscription("Erreur lors de l'inscription : " + response.statusText);
                setTimeout(() => setErrorInscription(''), 5000);
            }
        } catch (error) {
            setErrorInscription("Erreur lors de l'inscription : " + error.message);
            setTimeout(() => setErrorInscription(''), 5000);
        }
    };

    useEffect(() => {
    }, []);

    return (
        <Col xs={12} sm={6}>
            <h2>Formulaire d'inscription</h2>
            <Form onSubmit={handleSubmit(handleInscription)}>
                <Row>
                    <Col className='mb-2' xs={12} md={6}>
                        <Form.Group controlId='InscriptionForm.Nom'>
                            <Form.Label>Nom</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Votre nom'
                                {...register('nom')}
                            />
                            {errors.nom && (
                                <p className='error'>{errors.nom.message}</p>
                            )}
                        </Form.Group>
                    </Col>
                    <Col className='mb-2' xs={12} md={6}>
                        <Form.Group controlId='InscriptionForm.Prenom'>
                            <Form.Label>Prénom</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Votre prénom'
                                {...register('prenom')}
                            />
                            {errors.prenom && (
                                <p className='error'>{errors.prenom.message}</p>
                            )}
                        </Form.Group>
                    </Col>
                    <Col className='mb-2' xs={12} md={6}>
                        <Form.Group controlId='InscriptionForm.User_Name'>
                            <Form.Label>Nom d'utilisateur</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder="Votre nom d'utilisateur"
                                {...register('user_name')}
                            />
                            {errors.user_name && (
                                <p className='error'>{errors.user_name.message}</p>
                            )}
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col className='mb-2' xs={12} md={6}>
                        <Form.Group controlId='InscriptionForm.Password'>
                            <Form.Label>Mot de passe</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Votre mot de passe'
                                {...register('mot_de_passe')}
                            />
                            {errors.mot_de_passe && (
                                <p className='error'>{errors.mot_de_passe.message}</p>
                            )}
                        </Form.Group>
                    </Col>
                    <Col className='mb-2' xs={12} md={6}>
                        <Form.Group controlId='InscriptionForm.ConfirmPassword'>
                            <Form.Label>Confirmer le mot de passe</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Confirmer votre mot de passe'
                                {...register('confirmMotDePasse')}
                            />
                            {errors.confirmMotDePasse && (
                                <p className='error'>{errors.confirmMotDePasse.message}</p>
                            )}
                        </Form.Group>
                    </Col>
                </Row>
                <Button className='btn-good' type='submit'>
                    Ajouter
                </Button>
                {errorInscription && <p className='error'>{errorInscription}</p>}
                {valideInscription && <p className='success'>{valideInscription}</p>}
            </Form>
        </Col>
    );
}

export default InscriptionForm;