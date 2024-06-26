import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import '../../style/Layout/Footer.css'

function MyFooter() {
    return (
        <footer className="d-flex flex-column py-4 bg-red">
            <Container fluid>
                <Row>
                    <Col xs={12} md={6}>
                        <h5>M2L</h5>
                        <h6>&copy; 2023. Tous droits réservés.</h6>
                    </Col>
                    <Col xs={12} md={6}>
                        <h5>Contactez-nous</h5>
                        <ul className="list-unstyled">
                            <li>
                                <FontAwesomeIcon icon={faEnvelope} />
                                <span className="label">contact@m2l-bsl.com</span>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default MyFooter;
