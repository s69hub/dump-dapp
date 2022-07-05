import React, { Fragment } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import logo from "../../images/logo.svg";
import xusd from "../../images/xusd.svg";
import Countdown from "react-countdown";
import telegram from "../../images/telegram.svg";
import twitter from "../../images/twitter.svg";

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
        <Col className="text-center">
          <img src={logo} height="200px" className="logo" />
          <p>
            <a
              href="https://xsurgecrypto.net/"
              target="_blank"
              className="link-light"
            >
              Powered By <img src={xusd} height={40} />
            </a>
          </p>
        </Col>
      </Row>
      <Row>
        <Col lg={12} className="mt-3 text-center">
          <h1 className="soon">DUMP is coming...!</h1>
          <h2 className="fs-6">
            The first ever fully collateralized ever-rising token backed by
            xUSD's Revolutionary Internal Liquidity Pool Technology
          </h2>
        </Col>
      </Row>
      {/* <Col lg={12} className="d-flex justify-content-center">
          <p>Launch on { new Date(1657057545000).toLocaleString() } </p>
          </Col> */}
      <Row className="d-flex justify-content-center">
        <Col xs={8} className="mt-4">
          <Countdown date={1657062000000} renderer={countdownRenderer} />
        </Col>
      </Row>
      <Row className="mt-4 d-flex justify-content-center">
        <Col sm={12} md={4} className="text-center">
          <a href="https://t.me/+tCppOVSzIL01ZjRk" target="_blank">
            <Button variant="secondary">
              <img
                src={telegram}
                alt="Telegram"
                height="25px"
                className="shadow-filter me-2"
              />
              Join Telegram!
            </Button>
          </a>
        </Col>
        <Col sm={12} md={4} className="text-center">
          <a href="https://twitter.com/DumpToken" target="_blank">
            <Button variant="secondary mt-4 mt-md-0 mb-4 mb-md-0">
              <img
                src={twitter}
                alt="Twitter"
                height="25px"
                className="shadow-filter me-2"
              />
              Follow on Twitter!
            </Button>
          </a>
        </Col>
      </Row>
    </Container>
  );
}

export default Soon;
