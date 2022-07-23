import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Vault from "../Vault/Vault";
import dump from "../../images/dump.svg";
import dumprain from "../../images/dumprain.svg";

function Farm() {
  return (
    <Container fluid>
      <Row>
        <Col className="text-center">
          <img
            src={dumprain}
            height="200"
            className="mt-2 mb-5 shadow-filter"
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Vault
            key={0}
            vault="0x5A985Bb05B9B2f1a0b7343450bFD2625Fb02d2b9"
            deposit="DUMP-BNB (PCS)"
            tokenAddress="0x3640C27B470a0Fd9dcfC9F1f6E08E42d7b713FB9"
            earn="$DUMP"
            img={dump}
          />
          <Vault key={1} />
        </Col>
      </Row>
    </Container>
  );
}

export default Farm;
