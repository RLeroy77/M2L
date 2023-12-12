import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, ListGroup } from 'react-bootstrap';
import '../style/AdminProduit.css';


const InputField = ({ label, type, placeholder, value, onChange }) => {
    return (
        <Form.Group controlId={`form${label}`}>
            <Form.Label>{label}</Form.Label>
            <Form.Control type={type} placeholder={placeholder} value={value} onChange={onChange} />
        </Form.Group>
    );
};

function AdminProduit() {
    const [Product, setProduct] = useState([]);

    //Pour la création
    const [errorProduct, setErrorProduct] = useState('');
    const [valideProduct, setValideProduct] = useState('');
    const [newDataProduct, setNewDataProduct] = useState({
        nom: "",
        prix: "",
        quantite: "",
        description: "",
        image: null,
    });

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
            const reponse = await fetch('http://localhost:8000/produit')
            const data = await reponse.json();
            setProduct(data);
        } catch (error) {
            console.log(error);
        }
    };

    //Début partie Ajout
    // Gére les changements d'entrée dans le formulaire de création et de maintenir l'état du formulaire à jour en fonction des modifications de l'utilisateur
    const handleInputChangeAddProduct = (fieldName, value) => {
        setNewDataProduct({ ...newDataProduct, [fieldName]: value });
    };

    //Vérifie si tous les champs du formulaire d'ajout son remplis 
    const validateFieldsAddProduct = (data) => {
        const requiredFields = ['nom', 'prix', 'quantite', 'description', 'image'];
        for (const field of requiredFields) {
            if (!data[field]) {
                setErrorProduct(`Veuillez remplir le champ ${field}.`);
                setTimeout(() => setErrorProduct(''), 2500);
                return false;
            }
        }
        setErrorProduct('');
        return true;
    };

    //Ajoute un produit
    const handleAddProduct = async () => {
        try {
            if (validateFieldsAddProduct(newDataProduct)) {
                const formData = new FormData();
                formData.append('nom', newDataProduct.nom);
                formData.append('prix', newDataProduct.prix);
                formData.append('quantite', newDataProduct.quantite);
                formData.append('description', newDataProduct.description);
                formData.append('image', newDataProduct.image);

                const reponse = await fetch('http://localhost:8000/produit', {
                    method: 'POST',
                    body: formData,
                });

                if (reponse.ok) {
                    setValideProduct('Produit ajouté avec succès');
                    RecupProduct()
                    setNewDataProduct({
                        nom: "",
                        prix: "",
                        quantite: "",
                        description: "",
                        image: null,
                    });
                    setTimeout(() => setValideProduct(''), 2500);
                } else {
                    console.error("Erreur lors de l'ajout d'un produit :", reponse.statusText);
                    setErrorProduct("Erreur lors de l'ajout d'un produit : " + reponse.statusText);
                    setTimeout(() => setErrorProduct(''), 2500);
                }
            }
        } catch (error) {
            console.error("Erreur lors de l'ajout d'un produit :", error);
            setErrorProduct("Erreur lors de l'ajout d'un produit : " + error);
            setTimeout(() => setErrorProduct(''), 2500);
        }
    };
    //Fin partie Ajout



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

                const editProductResponse = await fetch(`http://localhost:8000/produit/${selectedProductId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody),
                });

                if (editProductResponse.ok) {
                    setValideEdit('Produit modifié avec succès');
                    RecupProduct();
                    setEditDataProduct({
                        nom: "",
                        prix: "",
                        quantite: "",
                        description: "",
                    });
                    setTimeout(() => setValideEdit(''), 2500);
                } else {
                    console.error("Erreur lors de la modification du produit :", editProductResponse.statusText);
                    setErrorEdit("Erreur lors de la modification du produit : " + editProductResponse.statusText);
                    setTimeout(() => setErrorEdit(''), 2500);
                }
            }
        } catch (error) {
            console.error("Erreur lors de la modification du produit :", error);
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
    const handleDeleteProduct = async (productId) => {
        try {
            const deleteProductResponse = await fetch(`http://localhost:8000/produit/${productId}`, {
                method: 'DELETE',
            });

            if (deleteProductResponse.ok) {
                const updatedProductList = Product.filter((product) => product.id !== productId);
                setProduct(updatedProductList);
                setValideDelete('Produit supprimé avec succès');
                setTimeout(() => setValideDelete(''), 2500);
            } else {
                console.error("Erreur lors de la suppression du produit :", deleteProductResponse.statusText);
                setErrorDelete("Erreur lors de la suppression du produit : " + deleteProductResponse.statusText);
                setTimeout(() => setErrorDelete(''), 2500);
            }
        } catch (error) {
            console.error("Une erreur s'est produite :", error);
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
            <Row>
                <Col className='m-3' xs={12}>
                    <h2>Formulaire d'ajout de produit</h2>
                    <Form encType="multipart/form-data">
                        <Row>
                            <Col className='mb-2' xs={12} md={4} xl={3}>
                                <InputField
                                    label="Nom"
                                    type="text"
                                    placeholder="Nom du produit"
                                    value={newDataProduct.nom}
                                    onChange={(e) => handleInputChangeAddProduct('nom', e.target.value)}
                                />
                            </Col>
                            <Col className='mb-2' xs={12} md={4} xl={3}>
                                <InputField
                                    label="Prix"
                                    type="number"
                                    placeholder="Prix du produit"
                                    value={newDataProduct.prix}
                                    onChange={(e) => handleInputChangeAddProduct('prix', e.target.value)}
                                />
                            </Col>
                            <Col className='mb-2' xs={12} md={4} xl={3}>
                                <InputField
                                    label="Quantité"
                                    type="number"
                                    placeholder="Quantité du produit"
                                    value={newDataProduct.quantite}
                                    onChange={(e) => handleInputChangeAddProduct('quantite', e.target.value)}
                                />
                            </Col>
                            <Col className='mb-2' xs={12} md={4} xl={3}>
                                <InputField
                                    label="Description"
                                    type="text"
                                    placeholder="Description du produit"
                                    value={newDataProduct.description}
                                    onChange={(e) => handleInputChangeAddProduct('description', e.target.value)}
                                />
                            </Col>
                            <Col className='mb-2' xs={12} md={4} xl={3}>
                                <Form.Group controlId={`formImage`}>
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control
                                        type="file"
                                        accept=".png, .jpg, .jpeg"
                                        onChange={(e) => handleInputChangeAddProduct('image', e.target.files[0])}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button className='btn-good' onClick={handleAddProduct}>Ajouter</Button>
                        {errorProduct && <p className='error'>{errorProduct}</p>}
                        {valideProduct && <p className='success'>{valideProduct}</p>}
                    </Form>
                </Col>
                <Col className='m-3' xs={12}>
                    <h2>Liste des produits</h2>
                    {errorDelete && <p className='error'>{errorDelete}</p>}
                    {valideDelete && <p className='success'>{valideDelete}</p>}
                    {Product.length > 0 ? (
                        <Row>
                            {Product.map((product) => (
                                <Col key={product.id} xs={12} md={6} lg={4} xxl={3}>
                                    <Card className="d-flex align-items-center justify-content-center mb-2">
                                        <Card.Img
                                            variant="top"
                                            src={process.env.PUBLIC_URL + `/images/produits/${product.id}.png`}
                                            alt={product.nom}
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
                                                            <InputField
                                                                label="Nom"
                                                                type="text"
                                                                placeholder="Nom du produit"
                                                                value={editDataProduct.nom}
                                                                onChange={(e) => handleInputChangeEditProduct('nom', e.target.value)}
                                                            />
                                                        </Col>
                                                        <Col className='mb-2' xs={12}>
                                                            <InputField
                                                                label="Prix"
                                                                type="number"
                                                                placeholder="Prix du produit"
                                                                value={editDataProduct.prix}
                                                                onChange={(e) => handleInputChangeEditProduct('prix', e.target.value)}
                                                            />
                                                        </Col>
                                                        <Col className='mb-2' xs={12}>
                                                            <InputField
                                                                label="Quantité"
                                                                type="number"
                                                                placeholder="Quantité du produit"
                                                                value={editDataProduct.quantite}
                                                                onChange={(e) => handleInputChangeEditProduct('quantite', e.target.value)}
                                                            />
                                                        </Col>
                                                        <Col className='mb-2' xs={12}>
                                                            <InputField
                                                                label="Description"
                                                                type="text"
                                                                placeholder="Description du produit"
                                                                value={editDataProduct.description}
                                                                onChange={(e) => handleInputChangeEditProduct('description', e.target.value)}
                                                            />
                                                        </Col>
                                                    </Row>
                                                    <Button
                                                        className='btn-delete m-2'
                                                        onClick={cancelEdit}
                                                    >Annuler
                                                    </Button>
                                                    <Button
                                                        className='btn-good m-2'
                                                        onClick={handleEditProduct}
                                                    >Enregister
                                                    </Button>
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
        </Container>
    )
};

export default AdminProduit;