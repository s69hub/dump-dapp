import React, {useState, useEffect} from "react";
import { Container, Row, Col, Card, CardGroup } from "react-bootstrap";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import balanceOfABI from "./BalanceOfABI.json";

/* global BigInt */

import Parse from "parse/dist/parse.min.js";

Parse.initialize(
  process.env.REACT_APP_PARSE_APP_ID,
  process.env.REACT_APP_PARSE_JS_KEY
);
Parse.serverURL = process.env.REACT_APP_PARSE_SERVER_URL;

function BagValue() {
  const [dumpBalance, setDumpBalance] = useState(0);
  const [dumpPrice, setDumpPrice] = useState(0);

  const [priceData, setPriceData] = useState([]);
  const [oneDayChange, setOneDayChange] = useState(0);
  const [oneWeekChange, setOneWeekChange] = useState(0);
  const [oneMonthChange, setOneMonthChange] = useState(0);
  const [allTimeChange, setAllTimeChange] = useState(0);
  const [averageDailyChange, setAverageDailyChange] = useState(0);

  const { isAuthenticated, account } = useMoralis();

  const contractProcessor = useWeb3ExecuteFunction();

  const fetchPriceData = async () => {
    const query = new Parse.Query("PriceData");
    query.ascending("price");
    query.limit(100000);
    query.find().then((results) => {
      const data = results.map((result) => {
        return {
          date: result.get("date"),
          price: result.get("price"),
        };
      });
      setPriceData(data);
      setDumpPrice(data[data.length - 1].price);
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
        ((((priceData[priceData.length - 1].price - priceData[0].price) /
          priceData[0].price) *
          100) /
          priceData.length) *
          96
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

  useEffect(() => {
    fetchDumpBalance();
    fetchPriceData().then(() => {
      calculateChanges();
    });
  }, [isAuthenticated, account]);

  useEffect(() => {
    const interval = setInterval(() => {
      calculateChanges();
    }, 5000);
    return () => clearInterval(interval);
  }, [priceData]);
  return (
    <Container>
      <Row>
        <Col xs={12}>
          <Card className="card-info">
            <Card.Title className="mb-0">Last Price</Card.Title>
            <Card.Body>
              <Card.Text>${dumpPrice}</Card.Text>
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
                <Card.Text>
                  {dumpBalance.toLocaleString(`en-US`, {
                    maximumFractionDigits: 9,
                  })}{" "}
                  DUMP
                </Card.Text>
              </Card.Body>
            </Card>
            <Card className="card-info">
              <Card.Title className="mb-0">Value</Card.Title>
              <Card.Body>
                <Card.Text>
                  $
                  {(dumpBalance * dumpPrice).toLocaleString("en-US", {
                    maximumFractionDigits: 9,
                  })}
                </Card.Text>
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
              <Card.Title className="mb-0">Last 24 Hours</Card.Title>
              <Card.Body>
                <Card.Text>{oneDayChange.toFixed(5)} %</Card.Text>
              </Card.Body>
            </Card>
            <Card className="card-info">
              <Card.Title className="mb-0">Last 7 Days</Card.Title>
              <Card.Body>
                <Card.Text>
                  {oneWeekChange > 0
                    ? oneWeekChange.toFixed(5)
                    : allTimeChange.toFixed(5)}{" "}
                  %
                </Card.Text>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
        <Col xs={12} className="mt-1">
          <CardGroup>
            <Card className="card-info">
              <Card.Title className="mb-0">Last 30 Days</Card.Title>
              <Card.Body>
                <Card.Text>
                  {oneMonthChange > 0
                    ? oneMonthChange.toFixed(5)
                    : allTimeChange.toFixed(5)}{" "}
                  %
                </Card.Text>
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
            <Card.Title className="mb-0">DUMP Contract Address</Card.Title>
            <Card.Body>
              <Card.Text>
                <a
                  href="https://bscscan.com/token/0x6b8a384DDe6FC779342Fbb2E4a8EcF73eD18D151"
                  target="_blank"
                >
                  0x6b8a384DDe6FC779342Fbb2E4a8EcF73eD18D151
                </a>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} className="mt-1">
          <Card className="card-info">
            <Card.Title className="mb-0">Underlying Asset (xUSD)</Card.Title>
            <Card.Body>
              <Card.Text>
                <a
                  href="https://bscscan.com/token/0x324E8E649A6A3dF817F97CdDBED2b746b62553dD"
                  target="_blank"
                >
                  0x324E8E649A6A3dF817F97CdDBED2b746b62553dD
                </a>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default BagValue;
