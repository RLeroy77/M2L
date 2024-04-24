import React from "react";
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import '../../style/Pages/Home.css';

function Home() {
    return (
        <Container className='my-3'>
            <Row>

                <Col xs={12} className="mb-2">
                    <h1 className="bienvenue-home">Bienvenue sur "BoxeSportLorraine" - La Boutique de la Maison des Ligues de Lorraine (M2L)</h1>
                    <h3 className="devise-home">La référence en équipements de boxe pour les passionnés et les athlètes de la région !</h3>
                </Col>
                <Col xs={12} className="mb-2">
                    <h1 className="titre">Qui sommes nous ?</h1>
                    <h5 className="texte">La Maison des Ligues de Lorraine (M2L) a pour mission de fournir des espaces et des services aux différentes ligues sportives régionales et à d’autres structures hébergées. La M2L est une structure financée par le Conseil Régional de Lorraine dont l'administration est déléguée au Comité Régional Olympique et Sportif de Lorraine (CROSL).</h5>
                </Col>
                <Col xs={12}>
                    <Button
                        as={Link} to={'/Boutique'}
                        className='btn-good'
                        size="lg">
                        Voir la boutique
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default Home;