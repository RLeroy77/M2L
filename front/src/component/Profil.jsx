import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';


function Profil({ userId, setUserId, isAdmin, setIsAdmin, userName, setUserName }) {

    useEffect(() => {
    }, [userId]);

    return (
        <Container fluid="">
            <Row>
                <Col>Votre Profil : {userName}</Col>
            </Row>
        </Container>
    )
}

export default Profil;