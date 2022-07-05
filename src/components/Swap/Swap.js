import React from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Row,
  Form,
  Card,
  InputGroup,
} from "react-bootstrap";
import dump from "../../images/dump.svg";

function Swap() {
  return (
    <Container>
      <Row>
        <Col className="text-center text-light">
          <h1 className="pt-4">DARE YOU</h1>
          <img
            src={dump}
            height="100px"
            alt="Dare You DUMP!?"
            className="shadow-filter pb-4"
          />
        </Col>
      </Row>
      <Row className="d-flex justify-content-center">
        <Col md={6}>
          <Card className="card-main text-center">
            <Card.Title>BUY DUMP!</Card.Title>
            <Card.Body>
              <InputGroup className="px-md-3 px-sm-2 px-xs-1 pb-2">
                <InputGroup.Text>Amount</InputGroup.Text>

                <Form.Control
                  aria-label="bnb-amount"
                  placeholder="BNB"
                  type="number"
                />
                <Button variant="secondary" id="button-addon2">
                  MAX
                </Button>
              </InputGroup>
              <Button variant="success" className="mb-3">
                BUY NOW!
              </Button>
            </Card.Body>
          </Card>
        </Col>
        {/* <Col md={6}>
          <Card className="card-main me-0 me-md-3 h-100">
            <Card.Title>SELL DUMP!</Card.Title>
            <Card.Body></Card.Body>
          </Card>
        </Col> */}
      </Row>
    </Container>
  );
}

export default Swap;
