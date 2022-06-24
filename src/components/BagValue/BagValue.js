import React, {useState, useEffect} from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

import { useMoralis, useWeb3ExecuteFunction } from "react-moralis"
import balanceOfABI from "./BalanceOfABI.json"
import calculatePriceABI from "./CalculatePriceABI.json"

/* global BigInt */

function BagValue() {
    const [dumpBalance, setDumpBalance] = useState(0);
    const [price, setPrice] = useState(0);

    const { isAuthenticated, account } = useMoralis();

    const contractProcessor = useWeb3ExecuteFunction();

  const fetchDumpBalance = async () => {
    if (!isAuthenticated) {
      setDumpBalance(0);
    }
    await contractProcessor.fetch({
      params: balanceOf,
      onSuccess: (result) => {
        setDumpBalance(BigInt(result._hex).toString() / Math.pow(10, 18));
      },
    });
  };

  const balanceOf = {
    contractAddress: process.env.REACT_APP_DUMP_CONTRACT,
    functionName: "balanceOf",
    abi: balanceOfABI,
    params: { account: account },
  };

  const fetchDumpPrice = async () => {
    await contractProcessor.fetch({
      params: calculatePrice,
      onSuccess: (result) => {
        setPrice(BigInt(result._hex).toString() / Math.pow(10, 18));
      },
    });
  }

  const calculatePrice = {
    contractAddress: process.env.REACT_APP_DUMP_CONTRACT,
    functionName: "calculatePrice",
    abi: calculatePriceABI,
    params: {},
  };

  useEffect(() => {
    fetchDumpBalance();
    fetchDumpPrice();
  }, [isAuthenticated, account]);

  return (
    <Container className="d-flex justify-content-evenly">
      <Card className="text-center card-transparent">
        <Card.Body>
          <Card.Title>Your Bag</Card.Title>
          <Card.Text>
            <p>{dumpBalance} $DMP</p>
            <p>${dumpBalance * price}</p>
          </Card.Text>
        </Card.Body>
      </Card>

      <Card className="text-center">
        <Card.Body>
          <Card.Title>DUMP Price</Card.Title>
          <Card.Text>
            <p>$DMP = ${price} </p>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default BagValue;
      {
        /* <Row>
        <Col xs={8}>Your Balance:</Col>
        <Col xs={4}>{dumpBalance}</Col>
      </Row>
      <Row>
        <Col xs={8}>Your Bag Value:</Col>
        <Col xs={4}>{bagValue}</Col>
      </Row> */
      }