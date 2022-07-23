import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  InputGroup,
  FormControl,
  Card,
} from "react-bootstrap";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { addDecimals } from "../../../helpers/formatters";
import unstakeABI from "./UnstakeABI";
import timeUntileUnlockABI from "./TimeUntilUnlockABI";
import Countdown from "react-countdown";
import { IoIosBackspace } from "react-icons/io";

/* global BigInt */

function Unstake(props) {
  const { account } = useMoralis();

  const [timeUU, setTimeUU] = useState(0);
  const [unstakeAmount, setUnstakeAmount] = useState(0);
  const [earlyAmount, setEarlyAmount] = useState(0);

  const handleUnstakeAmount = (e) => {
    const amount = addDecimals(e.target.value, 18);
    setUnstakeAmount(BigInt(amount));
    setEarlyAmount(e.target.value * 0.95);
  };

  const contractProcessor = useWeb3ExecuteFunction();

  const timeUntilUnlock = {
    contractAddress: props.vault,
    functionName: "timeUntilUnlock",
    abi: timeUntileUnlockABI,
    params: { user: account },
  };

  const unstake = {
    contractAddress: props.vault,
    functionName: "withdraw",
    abi: unstakeABI,
    params: { amount: BigInt(unstakeAmount) },
  };

  const fetchUnstake = async () => {
    await contractProcessor.fetch({
      params: unstake,
      onSuccess: () => {
        props.setStakeStep(0);
      },
    });
  };

  const fetchTimeUntilUnlock = async () => {
    await contractProcessor.fetch({
      params: timeUntilUnlock,
      onSuccess: (result) => {
        const TUU = BigInt(result._hex).toString() * 1000 * 3;
        setTimeUU(TUU);
      },
    });
  };

  useEffect(() => {
    fetchTimeUntilUnlock();
  }, []);

  return (
    <Container>
      <Row>
        {timeUU > 0 && (
          <Col>
            <Button
              onClick={() => props.setStakeStep(0)}
              variant="primary"
              width="30px"
              className="me-3"
            >
              <IoIosBackspace size={20} />
            </Button>
            <Button disabled={true}>
              Unlocks In{" "}
              {
                <Countdown
                  date={Date.now() + timeUU}
                  onComplete={fetchTimeUntilUnlock}
                />
              }
            </Button>
            <p className="my-2">
              <small className="text-warning">Early Unlock Fee 5%</small>
            </p>

            <InputGroup className="px-3">
              <FormControl
                onChange={handleUnstakeAmount}
                type="number"
                placeholder="Amount"
                aria-label="Amount"
                style={{
                  borderTopLeftRadius: "1.25rem",
                  borderBottomLeftRadius: "1.25rem",
                }}
              />

              <Button
                onClick={fetchUnstake}
                variant="primary"
                style={{
                  borderTopRightRadius: "1.25rem",
                  borderBottomRightRadius: "1.25rem",
                }}
              >
                Early Withdraw!
              </Button>
            </InputGroup>
            <p className="text-warning fs-6 mt-2 mb-0">
              {earlyAmount > 0 ? `You will receive ${earlyAmount}` : ""}
            </p>
          </Col>
        )}
        {timeUU === 0 && (
          <Container>
            <Row>
              <Col xs={2}>
                <Button
                  onClick={() => props.setStakeStep(0)}
                  variant="primary"
                  size="lg"
                  className="me-1"
                >
                  <IoIosBackspace size={20} />
                </Button>
              </Col>
              <Col xs={10}>
                <InputGroup>
                  <FormControl
                    onChange={handleUnstakeAmount}
                    type="number"
                    placeholder="Amount"
                    aria-label="Amount"
                    style={{
                      borderTopLeftRadius: "1.25rem",
                      borderBottomLeftRadius: "1.25rem",
                    }}
                  />

                  <Button
                    onClick={fetchUnstake}
                    variant="primary"
                    style={{
                      borderTopRightRadius: "1.25rem",
                      borderBottomRightRadius: "1.25rem",
                    }}
                  >
                    Withdraw!
                  </Button>
                </InputGroup>
              </Col>
            </Row>
          </Container>
        )}
      </Row>
    </Container>
  );
}

export default Unstake;
