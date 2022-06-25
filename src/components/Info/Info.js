import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Rechart from "../Rechart/Rechart";
import BagValue from "../BagValue/BagValue";

function Info() {
  return (
    <Container className="pt-0 pt-md-5 text-light">
      <Row>
        <Col md={6}>
          <Card className="card-transparent me-3 h-100">
            <Card.Title>Information</Card.Title>
            <BagValue />
          </Card>
        </Col>
        <Col md={6}>
          <Card className="card-transparent me-3 p-1">
            <Card.Title>Chart</Card.Title>
            <Card.Body className="text-dark">
              <Rechart />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Info;
