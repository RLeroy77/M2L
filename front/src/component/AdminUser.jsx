import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table, Pagination } from 'react-bootstrap';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import '../style/AdminUser.css';

export default function AdminUser() {
    const [User, setUser] = useState([]);
    const [userId, setUserId] = useState(null);

    //Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(6);
    //Pour la modification
    const [errorRole, setErrorRole] = useState('');
    const [validRole, setValideRole] = useState('');

    //Pour la suppression
    const [errorDelete, setErrorDelete] = useState('');
    const [valideDelete, setValideDelete] = useState('');


    // Récuperer tous les utilisateurs
    const RecupUser = async () => {
        try {
            const reponse = await fetch('http://localhost:8000/utilisateur');
            const data = await reponse.json();
            setUser(data.map(user => ({
                ...user,
                formattedDateCreation: format(new Date(user.date_creation), 'dd/MM/yyyy'),
                formattedDateMAJ: format(new Date(user.date_mise_a_jour), 'dd/MM/yyyy')
            })));
        } catch (error) {
            console.log(error);
        }
    };


    //Début partie modification rôle
    const handleSwitchChange = async (userId) => {
        try {
            // Mettre à jour la valeur admin du utilisateur avec l'ID correspondant
            setUser(prevUsers => prevUsers.map(user => (
                user.id === userId ? { ...user, admin: user.admin === 1 ? 0 : 1 } : user
            )));
            // Récupérer la nouvelle valeur du rôle (admin) pour l'utilisateur actuel
            const newUser = User.find(user => user.id === userId);
            // Envoyer la nouvelle valeur au backend
            const response = await fetch(`http://localhost:8000/utilisateur/role/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ admin: newUser.admin === 1 ? 0 : 1 }), // Envoyer la nouvelle valeur du rôle (admin)
            });

            if (response.ok) {
                setUserId(userId);
                console.log("Rôle modifié avec succès");
                setValideRole("Rôle modifié avec succès");
                setTimeout(() => setValideRole(""), 2500);
            } else {
                throw new Error('Erreur lors de la modification du rôle');
            }
        } catch (error) {
            console.error("Erreur lors de la modification du rôle :", error);
            setErrorRole("Erreur lors de la modification du rôle : " + error.message);
            setTimeout(() => setErrorRole(''), 2500);
            // Revert à l'état précédent si une erreur survient
            setUser(prevUsers => prevUsers.map(user => (
                user.id === userId ? { ...user, admin: user.admin === 1 ? 0 : 1 } : user
            )));
        }
    };
    //Fin partie modification rôle

    //Début partie Suppression
    const handleDeleteUser = async (userId) => {
        try {
            const deleteUserResponse = await fetch(`http://localhost:8000/utilisateur/${userId}`, {
                method: 'DELETE',
            });

            if (deleteUserResponse.ok) {
                const updatedUserList = User.filter((user) => user.id !== userId);
                setUser(updatedUserList);
                setValideDelete('utilisateur supprimé avec succès');
                setTimeout(() => setValideDelete(''), 2500);
            } else {
                console.error("Erreur lors de la suppression du utilisateur :", deleteUserResponse.statusText);
                setErrorDelete("Erreur lors de la suppression du utilisateur : " + deleteUserResponse.statusText);
                setTimeout(() => setErrorDelete(''), 2500);
            }
        } catch (error) {
            console.error("Une erreur s'est utilisateure :", error);
            setErrorDelete("Erreur lors de la suppression du utilisateur : " + error);
            setTimeout(() => setErrorDelete(''), 2500);
        }
    };
    //Fin partie Suppression

    //Début partie Pagination
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = User.slice(indexOfFirstUser, indexOfLastUser);
    const pageCount = Math.ceil(User.length / usersPerPage);
    const pageArray = pageCount > 0 ? [...Array(pageCount)] : [];
    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    const adjustUsersPerPage = () => {
        const screenHeight = window.innerHeight;
        // Ajuster le nombre d'éléments par page en fonction de la hauteur de l'écran
        if (screenHeight < 600) {
            setUsersPerPage(3);
        } else if (screenHeight < 900) {
            setUsersPerPage(7);
        } else {
            setUsersPerPage(8);
        }
    };
    //Fin partie Pagination

    useEffect(() => {
        RecupUser();
        // Appeler la fonction d'ajustement au chargement initial de la page
        adjustUsersPerPage();

        // Ajouter un écouteur d'événements pour détecter les changements de taille d'écran
        window.addEventListener('resize', adjustUsersPerPage);

        // Nettoyer l'écouteur d'événements lors du démontage du composant
        return () => {
            window.removeEventListener('resize', adjustUsersPerPage);
        };
    }, []);

    return (
        <Container fluid="">
            <Row>
                <Col className='m-3' xs={12}>
                    <h2>Liste des utilisateurs :</h2>
                    {errorDelete && <p className='error'>{errorDelete}</p>}
                    {valideDelete && <p className='success'>{valideDelete}</p>}
                    {User.length > 0 ? (
                        <React.Fragment>
                            <Table className='mt-2' responsive striped bordered hover variant="light">
                                <thead>
                                    <tr className="text-center">
                                        <th>Nom d'utilisateur</th>
                                        <th>Nom</th>
                                        <th>Prénom</th>
                                        <th>Date de création</th>
                                        <th>Date de mise à jour</th>
                                        <th>Admin</th>
                                        <th>Interaction</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentUsers.map((user) => (
                                        <tr className="align-middle" key={user.id}>
                                            <td>{user.user_name}</td>
                                            <td>{user.nom}</td>
                                            <td>{user.prenom}</td>
                                            <td>{user.formattedDateCreation}</td>
                                            <td>{user.formattedDateMAJ}</td>
                                            <td>
                                                <div className="d-flex align-items-center justify-content-center">
                                                    <Form.Check
                                                        className="custom-switch"
                                                        type="switch"
                                                        id={`custom-switch-${user.id}`}
                                                        label=""
                                                        checked={user.admin === 1}
                                                        onChange={() => handleSwitchChange(user.id)}
                                                    />
                                                    {user.id === userId && (
                                                        <React.Fragment>
                                                            {errorRole && <p className='error'>{errorRole}</p>}
                                                            {validRole && <p className='success'>{validRole}</p>}
                                                        </React.Fragment>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="text-center align-middle">
                                                <Button size='sm'
                                                    className='btn-delete m-2'
                                                    onClick={() => handleDeleteUser(user.id)}
                                                >
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <Pagination className="justify-content-center">
                                {pageArray.map((_, index) => (
                                    <Pagination.Item
                                        key={index + 1}
                                        active={index + 1 === currentPage}
                                        onClick={() => paginate(index + 1)}
                                    >
                                        {index + 1}
                                    </Pagination.Item>
                                ))}
                            </Pagination>
                        </React.Fragment>
                    ) : (
                        <p>Pas d'utilisateur</p>
                    )}
                </Col>
            </Row>
        </Container>
    )
}
