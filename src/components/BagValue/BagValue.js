import React, {useState, useEffect} from "react";
import { Container, Row, Col, Card, CardGroup } from "react-bootstrap";

import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import balanceOfABI from "./BalanceOfABI.json";
import calculatePriceABI from "./CalculatePriceABI.json";

import axios from "axios";
/* global BigInt */

const API = axios.create({
  baseURL: process.env.REACT_APP_DUMP_PRICE_API,
});

function BagValue() {
  const [dumpBalance, setDumpBalance] = useState(0);
  const [price, setPrice] = useState(0);

  const [priceData, setPriceData] = useState([]);
  const [oneDayChange, setOneDayChange] = useState(0);
  const [oneWeekChange, setOneWeekChange] = useState(0);
  const [oneMonthChange, setOneMonthChange] = useState(0);
  const [allTimeChange, setAllTimeChange] = useState(0);
  const [averageDailyChange, setAverageDailyChange] = useState(0);

  const { isAuthenticated, account } = useMoralis();

  const contractProcessor = useWeb3ExecuteFunction();

  const fetchPriceData = async () => {
    await API.get("/price").then((res) => {
      setPriceData(res.data);
    });
  };

  const calculateChanges = () => {
    if (priceData.length > 1) {
      setOneDayChange(
        ((priceData[priceData.length - 1].price -
          priceData[priceData.length - 97].price) /
          priceData[priceData.length - 97].price) *
          100
      );

      setAllTimeChange(
        ((priceData[priceData.length - 1].price - priceData[0].price) /
          priceData[0].price) *
          100
      );

      setAverageDailyChange(
        ((priceData[priceData.length - 1].price - priceData[0].price) /
          priceData.length) *
          100
      );
    }

    if (priceData.length > 672) {
      setOneWeekChange(
        ((priceData[priceData.length - 1].price -
          priceData[priceData.length - 673].price) /
          priceData[priceData.length - 673].price) *
          100
      );
    }

    if (priceData.length > 3040) {
      setOneMonthChange(
        ((priceData[priceData.length - 1].price -
          priceData[priceData.length - 3041].price) /
          priceData[priceData.length - 3041].price) *
          100
      );
    }
  };

  const fetchDumpBalance = async () => {
    if (!isAuthenticated) {
      setDumpBalance(0);
    }
    await contractProcessor.fetch({
      params: balanceOf,
      onSuccess: (result) => {
        setDumpBalance(BigInt(result._hex).toString() / Math.pow(10, 18));
      },
      onError: (error) => {
        console.log(error);
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
  };

  const calculatePrice = {
    contractAddress: process.env.REACT_APP_DUMP_CONTRACT,
    functionName: "calculatePrice",
    abi: calculatePriceABI,
    params: {},
  };

  useEffect(() => {
    fetchDumpBalance();
    fetchDumpPrice();
    fetchPriceData().then(() => {
      calculateChanges();
    });
  }, [isAuthenticated, account]);

  return (
    <Container>
      <Row>
        <Col xs={12}>
          <Card className="card-info">
            <Card.Title className="mb-0">Current Price</Card.Title>
            <Card.Body>
              <Card.Text>${price}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <p className="text-center mb-0 mt-3">Your Bag</p>
          <CardGroup>
            <Card className="card-info">
              <Card.Title className="mb-0">Balance</Card.Title>
              <Card.Body>
                <Card.Text>{dumpBalance.toFixed(5)} DMP</Card.Text>
              </Card.Body>
            </Card>
            <Card className="card-info">
              <Card.Title className="mb-0">Value</Card.Title>
              <Card.Body>
                <Card.Text>${(dumpBalance * price).toFixed(2)}</Card.Text>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <p className="text-center mb-0 mt-3">Price Changes</p>
          <CardGroup>
            <Card className="card-info">
              <Card.Title className="mb-0">24 Hour</Card.Title>
              <Card.Body>
                <Card.Text>{oneDayChange.toFixed(5)} %</Card.Text>
              </Card.Body>
            </Card>
            <Card className="card-info">
              <Card.Title className="mb-0">7 Day</Card.Title>
              <Card.Body>
                <Card.Text>{oneWeekChange.toFixed(5)} %</Card.Text>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
        <Col xs={12} className="mt-1">
          <CardGroup>
            <Card className="card-info">
              <Card.Title className="mb-0">30 Days</Card.Title>
              <Card.Body>
                <Card.Text>{oneMonthChange.toFixed(5)} %</Card.Text>
              </Card.Body>
            </Card>
            <Card className="card-info">
              <Card.Title className="mb-0">All Time</Card.Title>
              <Card.Body>
                <Card.Text>{allTimeChange.toFixed(5)} %</Card.Text>
              </Card.Body>
            </Card>
            <Card className="card-info">
              <Card.Title className="mb-0">Avg. Daily</Card.Title>
              <Card.Body>
                <Card.Text>{averageDailyChange.toFixed(5)} %</Card.Text>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <p className="text-center mb-0 mt-3">Token Details</p>
          <Card className="card-info">
            <Card.Title className="mb-0">DMP Contract Address</Card.Title>
            <Card.Body>
              <Card.Text>0x15F62C92c5a1b3172B071E3391C82bF815c5e4C8</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} className="mt-1">
          <Card className="card-info">
            <Card.Title className="mb-0">Underlying Asset (xUSD)</Card.Title>
            <Card.Body>
              <Card.Text>0x15F62C92c5a1b3172B071E3391C82bF815c5e4C8</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default BagValue;
