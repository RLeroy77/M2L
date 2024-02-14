// EditProduitForm.jsx
import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const EditProduitForm = ({ onEdit, onCancel, initialData }) => {
    const schema = yup.object({
        nom: yup.string().max(50, "Le nom du produit ne doit pas dépasser 50 caractères"),
        prix: yup.string(),
        quantite: yup.string(),
        description: yup.string(),
    }).test('at-least-one', null, (value) => {
        return (
            value.nom !== undefined ||
            value.prix !== undefined ||
            value.quantite !== undefined ||
            value.description !== undefined
        );
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: initialData,
    });

    const onSubmit = (data) => {
        onEdit(data);
    };

    return (
        <Form onSubmit={handleSubmit(onEdit)}>
            <Row>
                <Col className='mb-2' xs={12}>
                    <Form.Group controlId="formNom">
                        <Form.Label>Nom</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nom du produit"
                            isInvalid={!!errors.nom}
                            {...register("nom")}
                        />
                        <Form.Control.Feedback type="invalid">{errors.nom?.message}</Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col className='mb-2' xs={12}>
                    <Form.Group controlId="formPrix">
                        <Form.Label>Prix</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Prix du produit"
                            isInvalid={!!errors.prix}
                            {...register("prix")}
                        />
                        <Form.Control.Feedback type="invalid">{errors.prix?.message}</Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col className='mb-2' xs={12}>
                    <Form.Group controlId="formQuantite">
                        <Form.Label>Quantité</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Quantité du produit"
                            isInvalid={!!errors.quantite}
                            {...register("quantite")}
                        />
                        <Form.Control.Feedback type="invalid">{errors.quantite?.message}</Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col className='mb-2' xs={12}>
                    <Form.Group controlId="formDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Description du produit"
                            isInvalid={!!errors.description}
                            {...register("description")}
                        />
                        <Form.Control.Feedback type="invalid">{errors.description?.message}</Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            <Button className='btn-delete m-2' onClick={onCancel}>
                Annuler
            </Button>
            <Button className='btn-good m-2' type="submit">
                Enregistrer
            </Button>
        </Form>
    );
};

export default EditProduitForm;
