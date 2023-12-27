import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';


function Profil({ userId }) {

    useEffect(() => {
    }, [userId]);

    return (
        <Container fluid="">
            <Row>
                <Col>
                    Votre id est : {userId}
                </Col>
            </Row>
        </Container>
    )
}

export default Profil;