import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Rechart from "../Rechart/Rechart";
import BagValue from "../BagValue/BagValue";
import dump from "../../images/dump.svg";

function Info() {
  return (
    <Container className="text-light">
      <Row>
        <Col xs={12} className="d-flex justify-content-evenly ">
          <img
            src={dump}
            className="shadow-filter img-fluid info-dump mb-5 mt-0 mt-md-5"
            alt="DUMP Token!"
          />
        </Col>
        <Col md={6}>
          <Card className="card-transparent me-3 h-100 p-1">
            <Card.Title>Information</Card.Title>
            <Card.Body>
              <BagValue />
            </Card.Body>
            <Card.Footer className="text-muted">
              <small>Last updated 3 mins ago</small>
            </Card.Footer>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="card-transparent p-1">
            <Card.Title>Chart</Card.Title>
            <Card.Body className="text-dark">
              <Rechart />
            </Card.Body>
            <Card.Footer className="text-muted">
              <small>Last updated 3 mins ago</small>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Info;
