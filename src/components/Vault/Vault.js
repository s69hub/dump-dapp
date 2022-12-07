import React, { useState, useEffect, Fragment } from "react";
import {
  Button,
  Accordion,
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { FcAdvance } from "react-icons/fc";
import nextVault from "../../images/nextvault.svg";
import telegram from "../../images/telegram.svg";
import logo from "../../images/logo.svg";
import WalletBalance from "./WalletBalance";
import { useWeb3ExecuteFunction, useMoralis } from "react-moralis";

import PendingRewards from "./PendingRewards";
import ClaimRewards from "./ClaimRewards";
import TotalDeposit from "./TotalDeposit";
import allowanceABI from "./AllowanceABI";
import approveABI from "./ApproveABI";
import stakeABI from "./StakeABI";
import { addDecimals } from "../../helpers/formatters";
import Unstake from "./Unstake/Unstake";
import { IoIosBackspace } from "react-icons/io";
import TaxFreePairing from "./TaxFreePairing/TaxFreePairing";

/* global BigInt */

function Vault(props) {
  const { account, isAuthenticated, authenticate, chainId, Moralis } =
    useMoralis();
  const contractProcessor = useWeb3ExecuteFunction();
  const [isApproved, setIsApproved] = useState(false);
  const [stakeStep, setStakeStep] = useState(0);
  const [stakeAmount, setStakeAmount] = useState(0);

  const allowance = {
    contractAddress: props.tokenAddress,
    functionName: "allowance",
    abi: allowanceABI,
    params: {
      holder: account,
      spender: props.vault,
    },
  };

  const approve = {
    contractAddress: props.tokenAddress,
    functionName: "approve",
    abi: approveABI,
    params: {
      spender: props.vault,
      amount: BigInt(Math.pow(2, 128) - 1),
    },
  };

  const stake = {
    contractAddress: props.vault,
    functionName: "stake",
    abi: stakeABI,
    params: { amount: BigInt(stakeAmount) },
  };

  const fetchAllowance = async () => {
    await contractProcessor.fetch({
      params: allowance,
      onSuccess: (result) => {
        if (result.toString() > "0") {
          setIsApproved(true);
        } else {
          setIsApproved(false);
        }
      },
    });
  };

  const fetchApprove = async () => {
    if (!isAuthenticated) {
      await Moralis.enableWeb3();
      await authenticate({
        onError: () => {
          throw new Error("Connect to web3 provider failed!");
        },
      });
    }
    await contractProcessor.fetch({
      params: approve,
      onError: (error) => {
        console.error(error);
      },
      onSuccess: () => setIsApproved(true),
    });
  };

  const fetchStake = async () => {
    await contractProcessor.fetch({
      params: stake,
      onSuccess: () => {
        setStakeStep(0);
      },
    });
  };

  const handleStakeAmount = (e) => {
    const amount = addDecimals(e.target.value, 18);
    setStakeAmount(BigInt(amount));
  };

  useEffect(() => {
    fetchAllowance();
    if (!isAuthenticated) {
      setStakeStep(0);
    }
  }, [account, isAuthenticated, chainId]);

  if (!props.vault) {
    return (
      <Accordion defaultActiveKey={100} className="accordion-vault mb-3 shadow">
        <Accordion.Item eventKey={props.key}>
          <Accordion.Header>
            <img
              src={nextVault}
              height="20"
              className="me-3 shadow-filter-sm"
            />{" "}
            Deposit <span className="text-secondary">???</span>
            <FcAdvance size="20" className="mx-1 shadow-filter-sm" /> Earn{" "}
            <span className="text-secondary">???</span>
          </Accordion.Header>
          <Accordion.Body>
            <Row className="text-center">
              <Col>
                <p>
                  All the projects launching on DUMP's Launchpad will be allowed
                  to have a vault here.
                </p>
                <p>
                  If you are a project owner and you would like to know more
                  about its criteria, please reach us at our communities!
                </p>
                <a
                  href="https://t.me/+tCppOVSzIL01ZjRk"
                  target="_blank"
                  className="nav-link"
                >
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
            </Row>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    );
  } else {
    return (
      <Accordion defaultActiveKey={100} className="accordion-vault mb-3 shadow">
        <Accordion.Item eventKey={props.key}>
          <Accordion.Header>
            <img
              src={props.img}
              height="20"
              className="me-3 shadow-filter-sm"
            />{" "}
            Deposit {props.deposit}{" "}
            <FcAdvance size="20" className="mx-1 shadow-filter-sm" /> Earn{" "}
            {props.earn}
          </Accordion.Header>
          <Accordion.Body>
            <Row className="text-center">
              <Col md={6} className="my-auto">
                <Row>
                  <Col className="inner-block">
                    <p>
                      Wallet Balance:{" "}
                      <WalletBalance tokenAddress={props.tokenAddress} />
                    </p>
                    <TaxFreePairing />
                  </Col>
                </Row>
                <Row>
                  <Col className="inner-block mt-2">
                    <p>
                      Your Deposit: <TotalDeposit vault={props.vault} />{" "}
                    </p>
                    {/* <TimeUntilUnlock vault={props.vault} /> */}
                    {(!isApproved || !isAuthenticated) && stakeStep === 0 && (
                      <>
                        <div className="px-5">
                          <Button
                            onClick={fetchApprove}
                            variant="primary"
                            className="btn-wide"
                          >
                            Enable
                          </Button>
                        </div>
                      </>
                    )}

                    {stakeStep === 0 && isApproved && isAuthenticated && (
                      <Fragment>
                        <Container>
                          <Row>
                            <Col
                              lg={12}
                              className="d-flex justify-content-evenly"
                            >
                              <Button
                                onClick={() => setStakeStep(1)}
                                variant="primary"
                                className="me-3 btn-wide"
                              >
                                Deposit
                              </Button>

                              <Button
                                onClick={() => setStakeStep(2)}
                                variant="primary"
                                className="btn-wide"
                              >
                                Withdraw
                              </Button>
                            </Col>
                          </Row>
                        </Container>
                      </Fragment>
                    )}
                    {stakeStep === 1 && isApproved && isAuthenticated && (
                      <Fragment>
                        <Container>
                          <Row>
                            <Col xs={2}>
                              <Button
                                onClick={() => setStakeStep(0)}
                                variant="primary"
                                className="me-1"
                              >
                                <IoIosBackspace size={20} />
                              </Button>
                            </Col>
                            <Col xs={10}>
                              <InputGroup>
                                <FormControl
                                  onChange={handleStakeAmount}
                                  type="number"
                                  placeholder="Amount"
                                  aria-label="Amount"
                                  style={{
                                    borderTopLeftRadius: "1.25rem",
                                    borderBottomLeftRadius: "1.25rem",
                                  }}
                                />
                                <Button
                                  onClick={fetchStake}
                                  variant="primary"
                                  style={{
                                    borderTopRightRadius: "1.25rem",
                                    borderBottomRightRadius: "1.25rem",
                                  }}
                                >
                                  Deposit!
                                </Button>
                              </InputGroup>
                            </Col>
                          </Row>
                        </Container>
                      </Fragment>
                    )}
                    {stakeStep === 2 && isApproved && isAuthenticated && (
                      <Unstake
                        setStakeStep={setStakeStep}
                        vault={props.vault}
                      />
                    )}
                  </Col>
                </Row>
              </Col>
              <Col md={6} className="my-auto">
                <img src={logo} height="100" className="shadow-filter" />
                <p className="pt-2">
                  Your Earning:{" "}
                  <PendingRewards vault={props.vault} earn="$DUMP" />
                </p>
                <ClaimRewards vault={props.vault} />
              </Col>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    );
  }
}

export default Vault;
