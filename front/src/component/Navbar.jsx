import React, { useState, useEffect } from 'react';
// import { Route, Routes } from 'react-router-dom';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../style/Navbar.css'

function MyNavbar({ userId, setUserId, isAdmin, setIsAdmin, userName, setUserName }) {

    const handleLogout = () => {
        localStorage.clear();
        setUserId(null)
    };

    useEffect(() => {
    }, [userId]);

    return (
        <Navbar collapseOnSelect expand="sm" className="bg-jaune">
            <Container>
                <Navbar.Brand as={Link} to="/">M2L Produts</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/shop">Shop</Nav.Link>
                        <Nav.Link as={Link} to="">Abouts</Nav.Link>
                    </Nav>
                    <Nav>
                        {userId ? (
                            <NavDropdown title={userName} id="collapsible-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/profil">Profil</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="">Panier</NavDropdown.Item>
                                {isAdmin === "1" && (
                                    <>
                                        <NavDropdown.Item as={Link} to="/">Gestion des comptes</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/AddProduit">Gestion des produits</NavDropdown.Item>
                                    </>
                                )}
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={handleLogout}>Déconnexion</NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <Nav.Link as={Link} to="/connexion">Connexion/Inscription</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MyNavbar;

