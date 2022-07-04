import React from "react";
import {
  Col,
  Container,
  FloatingLabel,
  Row,
  Form,
  Card,
} from "react-bootstrap";

function Swap() {
  return (
    <Container>
      <Row>
        <Col className="text-center text-light">
          <h1>Swap</h1>
          <h3>BUY or SELL</h3>
          <h2>DUMP</h2>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Card className="card-main me-0 me-md-3 h-100">
            <Card.Title>BUY DUMP!</Card.Title>
            <Card.Body>
              <Form.Group>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Amount"
                  className="mb-3 text-dark"
                >
                  <Form.Control type="number" placeholder="BNB" />
                </FloatingLabel>
                You will receive: DUMP
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="card-main me-0 me-md-3 h-100">
            <Card.Title>SELL DUMP!</Card.Title>
            <Card.Body></Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Swap;
