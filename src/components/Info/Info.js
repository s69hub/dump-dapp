import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Rechart from "../Rechart/Rechart";
import BagValue from "../BagValue/BagValue";
import dump from "../../images/dump.svg";
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
        <Col xs={12} className="d-flex justify-content-evenly ">
          <img
            src={dump}
            className="shadow-filter img-fluid info-dump mb-5 mt-0 mt-md-5"
            alt="DUMP Token!"
          />
        </Col>
        <Col md={6} className="mb-3 mb-md-0">
          <Card className="card-main me-0 me-md-3 h-100">
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
        <Col md={6}>
          <Card className="card-main">
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
      </Row>
    </Container>
  );
}

export default Info;
