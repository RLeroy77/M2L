import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Cookies from 'js-cookie';
import '../../style/AdminProduit.css';

function CreateProduitForm() {
    const baseUrl = 'http://localhost:8000';

    const [errorProduct, setErrorProduct] = useState('');
    const [valideProduct, setValideProduct] = useState('');

    const schema = yup.object({
        nom: yup
            .string()
            .max(50, "Le nom d'utilisateur ne doit pas dépasser 50 caractères")
            .required("Veuillez entrer le nom du produit"),
        prix: yup
            .string()
            .required("Veuillez entrer le prix"),
        quantite: yup
            .string()
            .required("Veuillez entrer la quantité"),
        description: yup
            .string()
            .required("Veuillez entrer la description"),
        image: yup
            .mixed()
            .test('fileSize', "L'image ne doit pas dépasser 5 Mo", (value) => {
                return value && value[0].size <= 5000000;
            })
            .test('fileType', 'Veuillez télécharger une image valide', (value) => {
                return value && ['image/jpeg', 'image/png', 'image/gif'].includes(value[0].type);
            })
            .required("Veuillez entrer l'image"),
    }).required();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const handleAddProduct = async (data) => {
        try {
            await schema.validate(data, { abortEarly: false });

            const formData = new FormData();
            formData.append('nom', data.nom);
            formData.append('prix', data.prix);
            formData.append('quantite', data.quantite);
            formData.append('description', data.description);
            formData.append('image', data.image[0]); // Prenez le premier fichier du tableau

            const reponse = await fetch(`${baseUrl}/api/adminProduits/addProduit`, {
                method: 'POST',
                headers: {
                    'authorization': Cookies.get('token'),
                },
                body: formData,
            });

            if (reponse.ok) {
                setValideProduct('Produit ajouté avec succès');
                reset();
                setTimeout(() => setValideProduct(''), 2500);
            } else {
                console.error("Erreur lors de l'ajout d'un produit :", reponse.statusText);
                setErrorProduct("Erreur lors de l'ajout d'un produit : " + reponse.statusText);
                setTimeout(() => setErrorProduct(''), 2500);
            }
        } catch (error) {
            console.error("Erreur lors de l'ajout d'un produit :", error);
            setErrorProduct("Erreur lors de l'ajout d'un produit : " + error);
            setTimeout(() => setErrorProduct(''), 2500);
        }
    };

    return (
        <Col className='m-3' xs={12}>
            <Form encType="multipart/form-data" onSubmit={handleSubmit(handleAddProduct)}>
                <Row>
                    <Col className='mb-2' xs={12} md={4} xl={3}>
                        <Form.Group controlId="CreateProduitForm.Nom">
                            <Form.Label>Nom</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nom du produit"
                                {...register("nom")}
                            />
                            {errors.nom && <p className='error'>{errors.nom.message}</p>}
                        </Form.Group>
                    </Col>
                    <Col className='mb-2' xs={12} md={4} xl={3}>
                        <Form.Group controlId="CreateProduitForm.Prix">
                            <Form.Label>Prix</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Prix du produit"
                                {...register("prix")}
                            />
                            {errors.prix && <p className='error'>{errors.prix.message}</p>}
                        </Form.Group>
                    </Col>
                    <Col className='mb-2' xs={12} md={4} xl={3}>
                        <Form.Group controlId="CreateProduitForm.Quantite">
                            <Form.Label>Quantité</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Quantité du produit"
                                {...register("quantite")}
                            />
                            {errors.quantite && <p className='error'>{errors.quantite.message}</p>}
                        </Form.Group>
                    </Col>
                    <Col className='mb-2' xs={12} md={4} xl={3}>
                        <Form.Group controlId="CreateProduitForm.Description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Description du produit"
                                {...register("description")}
                            />
                            {errors.description && <p className='error'>{errors.description.message}</p>}
                        </Form.Group>
                    </Col>
                    <Col className='mb-2' xs={12} md={4} xl={3}>
                        <Form.Group controlId="CreateProduitForm.Image">
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type="file"
                                accept=".png, .jpg, .jpeg"
                                {...register("image")}
                            />
                            {errors.image && <p className='error'>{errors.image.message}</p>}
                        </Form.Group>
                    </Col>
                </Row>
                <Button className='btn-good' type="submit">
                    Ajouter
                </Button>
                {errorProduct && <p className='error'>{errorProduct}</p>}
                {valideProduct && <p className='success'>{valideProduct}</p>}
            </Form>
        </Col>
    )
}

export default CreateProduitForm;