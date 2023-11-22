import React from "react";
// import { Route, Routes } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

function Shop(userId, setUserId, isAdmin, setIsAdmin, userName, setUserName) {
    return (
        <Container fluid="">
            <Row>
                <Col xs={6} md={4}>Test</Col>
                <Col xs={6} md={4}>Test</Col>
                <Col xs={6} md={4}>Test</Col>
            </Row>
        </Container>
    );
}

export default Shop;