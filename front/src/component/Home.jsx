import React from "react";
import { Route, Routes } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Home() {
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

export default Home;