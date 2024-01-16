import React, { useState, useEffect } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../style/Navbar.css'

function MyNavbar({ userId, setUserId, isAdmin, setIsAdmin }) {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');

    const handleLogout = () => {
        Cookies.remove('userId');
        localStorage.clear();
        setUserId(null);
        setIsAdmin(null);
        navigate("/");
    };

    const getUserInfo = async (userId) => {
        try {
            const response = await fetch(`http://localhost:8000/user_name/${userId}`);
            const data = await response.json();
            setUserName(data[0].user_name);
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    };

    useEffect(() => {
        if (userId) {
            getUserInfo(userId);
        }
    }, [userId]);


    return (
        <Navbar collapseOnSelect expand="sm" className="bg-jaune">
            <Container>
                <Navbar.Brand as={Link} to="/">BoxeSportLorraine</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/Boutique">Boutique</Nav.Link>
                        <Nav.Link as={Link} to="/Panier">Panier</Nav.Link>
                        <Nav.Link as={Link} to='/APropos'>A propos</Nav.Link>
                    </Nav>
                    <Nav>
                        {userId ? (
                            <NavDropdown title={userName} id="collapsible-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/Profil">Profil</NavDropdown.Item>
                                {isAdmin === 1 && (
                                    <>
                                        <NavDropdown.Item as={Link} to="/AdminUser">Gestion des comptes</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/AdminProduit">Gestion des produits</NavDropdown.Item>
                                    </>
                                )}
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={handleLogout}>Déconnexion</NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <Nav.Link as={Link} to="/InscriptionConnexion">Connexion/Inscription</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MyNavbar;

