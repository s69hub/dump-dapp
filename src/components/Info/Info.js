import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Rechart from "../Rechart/Rechart";
import BagValue from "../BagValue/BagValue";
import logo from "../../images/logo.svg";
import xusd from "../../images/xusd.svg";
import ReactTimeAgo from "react-time-ago";
import { StateContext } from "../../contexts/StateContext";

function Info() {
  const { refresh } = useContext(StateContext);
  const [updateDate, setUpdateDate] = useState(new Date());

  useEffect(() => {
    setUpdateDate(new Date());
  }, [refresh]);

  return (
    <Container className="text-light">
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
          <h2 className="fs-6 pb-3">
            The first ever fully collateralized ever-rising token backed by
            xUSD's Revolutionary Internal Liquidity Pool Technology
          </h2>
        </Col>
      </Row>
      <Row>
        <Col md={6} className="mb-3 mb-md-0">
          <Card className="card-main me-0 me-md-3">
            <Card.Title>Chart</Card.Title>
            <Card.Body className="text-dark">
              <Rechart />
            </Card.Body>
            <Card.Footer className="text-muted">
              <small>
                Chart data is every 15 min from TGE till{" "}
                <ReactTimeAgo date={updateDate} />!
              </small>
            </Card.Footer>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="card-main  h-100">
            <Card.Title>Information</Card.Title>
            <Card.Body>
              <BagValue />
            </Card.Body>
            <Card.Footer className="text-muted">
              <small>
                All data provided by BSC api (last update{" "}
                <ReactTimeAgo date={updateDate} />
                ).
              </small>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Info;
