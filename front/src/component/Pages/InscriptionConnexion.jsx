import React, { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import Cookies from 'js-cookie';
import ConnexionForm from '../Form/ConnexionForm';
import InscriptionForm from '../Form/InscriptionForm';

function InscriptionConnexion() {
    Cookies.remove('userId');

    useEffect(() => {
    }, []);

    return (
        <Container fluid="">
            <Row>
                <InscriptionForm />

                <ConnexionForm />
            </Row>
        </Container>
    );
}

export default InscriptionConnexion;
