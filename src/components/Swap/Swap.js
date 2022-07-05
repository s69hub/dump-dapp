import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Row,
  Form,
  Card,
  InputGroup,
} from "react-bootstrap";
import dump from "../../images/dump.svg";
import balanceOfABI from "./BalanceOfABI.json";
import {
  useMoralisWeb3Api,
  useWeb3ExecuteFunction,
  useMoralis,
} from "react-moralis";
import BuyButton from "./BuyButton";
import SellButton from "./SellButton";

/* global BigInt */

function Swap() {
  const Web3Api = useMoralisWeb3Api();
  const ContractProcessor = useWeb3ExecuteFunction();
  const { account, chainId } = useMoralis();

  const [buyAmount, setBuyAmount] = useState();
  const [sellAmount, setSellAmount] = useState();

  const setMaxBuy = async () => {
    await Web3Api.account.getNativeBalance({ chain: chainId }).then((res) => {
      setBuyAmount(res.balance - 3000000000000000);
    });
  };

  const balanceOf = {
    contractAddress: process.env.REACT_APP_DUMP_CONTRACT,
    functionName: "balanceOf",
    abi: balanceOfABI,
    params: { account: account },
  };

  const setMaxSell = async () => {
    await ContractProcessor.fetch({
      params: balanceOf,
      onSuccess: (result) => {
        setSellAmount(BigInt(result._hex).toString());
      },
    });
  };

  return (
    <Container>
      <Row>
        <Col className="text-center text-light">
          <img
            src={dump}
            height="100px"
            alt="Dare You DUMP!?"
            className="shadow-filter pb-4 pt-2"
          />
        </Col>
      </Row>
      <Row className="d-flex justify-content-center">
        <Col md={6}>
          <Card className="card-main text-center">
            <Card.Title>BUY DUMP!</Card.Title>
            <Card.Body>
              <InputGroup className="px-md-3 px-sm-2 px-xs-1 pb-3">
                <InputGroup.Text>Amount</InputGroup.Text>

                <Form.Control
                  className="input"
                  aria-label="bnb-amount"
                  placeholder="BNB"
                  type="number"
                  value={buyAmount / 1e18}
                  onChange={(e) => setBuyAmount(e.target.value * 1e18)}
                />
                <Button
                  variant="secondary"
                  id="button-addon2"
                  onClick={setMaxBuy}
                >
                  MAX
                </Button>
              </InputGroup>
              <BuyButton amount={buyAmount} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="d-flex justify-content-center pt-3">
        <Col md={6}>
          <Card className="card-main text-center">
            <Card.Title>SELL DUMP!</Card.Title>
            <Card.Body>
              <InputGroup className="px-md-3 px-sm-2 px-xs-1 pb-3">
                <InputGroup.Text>Amount</InputGroup.Text>

                <Form.Control
                  className="input"
                  aria-label="dump-amount"
                  placeholder="DUMP"
                  type="number"
                  value={sellAmount / 1e18}
                  onChange={(e) => setSellAmount(e.target.value * 1e18)}
                />
                <Button
                  variant="secondary"
                  id="button-addon2"
                  onClick={setMaxSell}
                >
                  MAX
                </Button>
              </InputGroup>
              <SellButton amount={sellAmount} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Swap;
