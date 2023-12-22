import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';


function Profil({ userId, isAdmin}) {

    useEffect(() => {
    }, [userId]);

    return (
        <Container fluid="">
            <Row>
                <Col>
                    {/* <Col>Votre Profil : {userName}</Col> */}
                </Col>
            </Row>
        </Container>
    )
}

export default Profil;