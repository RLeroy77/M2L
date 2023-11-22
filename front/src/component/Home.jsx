import React from "react";
// import { Route, Routes } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

function Home(userId, setUserId, isAdmin, setIsAdmin, userName, setUserName) {
    return (
        <Container fluid="">
            <Row>
                <Col xs={12} sm={6} lg={4}>Test</Col>
                <Col xs={12} sm={6} lg={4}>Test</Col>
                <Col xs={12} sm={6} lg={4}>Test</Col>
            </Row>
        </Container>
    );
}

export default Home;