import React, { Fragment } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import logo from "../../images/logo.svg";
import dump from "../../images/dump.svg";
import Countdown from "react-countdown";

function Soon() {

    const countdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
      if (completed) {
        return;
      } else {
        return (
          <Row>
            <Col md={3} xs={6} className="p-0">
              <Card className="me-2 card-countdown">
                <Card.Text>
                  <h3>{days}</h3>
                  <small>{days > 1 ? `DAYS` : `DAY`}</small>
                </Card.Text>
              </Card>
            </Col>
            <Col md={3} xs={6} className="p-0">
              <Card className="me-2 card-countdown">
                <Card.Text>
                  <h3>{hours}</h3>
                  <small>{hours > 1 ? `HOURS` : `HOUR`}</small>
                </Card.Text>
              </Card>
            </Col>
            <Col md={3} xs={6} className="p-0 mt-2 mt-md-0">
              <Card className="me-2 card-countdown">
                <Card.Text>
                  <h3>{minutes}</h3>
                  <small>{minutes > 1 ? `MINUTES` : `MINUTE`}</small>
                </Card.Text>
              </Card>
            </Col>
            <Col md={3} xs={6} className="p-0 mt-2 mt-md-0">
              <Card className="me-2 card-countdown">
                <Card.Text>
                  <h3>{seconds}</h3>
                  <small>{seconds > 1 ? `SECONDS` : `SECOND`}</small>
                </Card.Text>
              </Card>
            </Col>
          </Row>
        );
      }
    };

  return (
    <Container className="pt-0 pt-md-5 text-light">
      <Row>
        <Col className="d-flex justify-content-center">
          <img src={logo} height="200px" className="logo" />
        </Col>
      </Row>
      <Row>
        <Col lg={12} className="mt-3 text-center">
          <h1 className="soon">DUMP is coming...!</h1>
          <h2 className="fs-6">
            The first ever fully collatoralized ever-rising token backed by xSurge's
            Revolutionary Internal Liquidity Pool Technology
          </h2>
        </Col>
      </Row>
      {/* <Col lg={12} className="d-flex justify-content-center">
          <p>Launch on { new Date(1657057545000).toLocaleString() } </p>
          </Col> */}
      <Row className="d-flex justify-content-center">
        <Col xs={8} className="mt-3">
          <Countdown date={1657057545000} renderer={countdownRenderer} />
        </Col>
      </Row>
    </Container>
  );
}

export default Soon;
