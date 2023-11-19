import React from 'react';
// import { Route, Routes } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import '../style/Navbar.css'

function MyNavbar() {
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
                        <NavDropdown title="User Name" id="collapsible-nav-dropdown">
                            <NavDropdown.Item as={Link} to="">Profil</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="">Panier</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="">Déconnexion</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link as={Link} to="/connexion">Connexion/Inscription</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MyNavbar;

