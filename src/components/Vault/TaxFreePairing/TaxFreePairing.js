import React, { Fragment, useEffect, useState } from "react";
import { Button, CloseButton, Modal, InputGroup, Form } from "react-bootstrap";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import AddLiquidityButton from "./AddLiquidityButton";
import balanceOfABI from "./BalanceOfABI";
import { addDecimals } from "../../../helpers/formatters";

/* global BigInt */

function TaxFreePairing() {
  const [modalShow, setModalShow] = useState(false);
  const [ratio, setRatio] = useState(0);

  const [dAmount, setDAmount] = useState("");
  const [bAmount, setBAmount] = useState("");

  const contractProcessor = useWeb3ExecuteFunction();
  const { account } = useMoralis();

  const handleDAmount = (e) => {
    setDAmount(e.target.value);
    setBAmount(e.target.value * ratio);
    if (e.target.value === "") {
      setBAmount("");
    }
  };

  const handleBAmount = (e) => {
    setBAmount(e.target.value);
    setDAmount(e.target.value / ratio);
    if (e.target.value === "") {
      setDAmount("");
    }
  };
  const getRatio = async () => {
    await contractProcessor.fetch({
      params: {
        contractAddress: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
        functionName: "balanceOf",
        abi: balanceOfABI,
        params: { account: "0x3640C27B470a0Fd9dcfC9F1f6E08E42d7b713FB9" },
      },
      onSuccess: (balB) => {
        contractProcessor.fetch({
          params: {
            contractAddress: "0x6b8a384DDe6FC779342Fbb2E4a8EcF73eD18D151",
            functionName: "balanceOf",
            abi: balanceOfABI,
            params: { account: "0x3640C27B470a0Fd9dcfC9F1f6E08E42d7b713FB9" },
          },
          onSuccess: (balD) => {
            setRatio(balB / balD);
          },
        });
      },
    });
  };

  useEffect(() => {
    getRatio();
    const interval = setInterval(() => {
      getRatio();
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Fragment>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Tax Free Pairing
      </Button>

      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Tax Free Pairing
          </Modal.Title>
          <CloseButton onClick={() => setModalShow(false)} className="me-1" />
        </Modal.Header>
        <Modal.Body>
          <p>
            You are going to provide liquidity on PancakeSwap for DUMP-BNB pair.
          </p>
          <p>Deposit $DUMP with equal amount of BNB (in USD value).</p>
          <p>Current Rate: 100,000 $DUMP = {ratio.toString() * 100000} BNB</p>
          <InputGroup className="px-5">
            <InputGroup.Text variant="primary">$DUMP</InputGroup.Text>
            <Form.Control
              placeholder="$DUMP Amount"
              aria-label="$DUMP Amount"
              value={dAmount}
              onChange={handleDAmount}
              style={{
                borderTopRightRadius: "1rem",
                borderBottomRightRadius: "1rem",
              }}
              type="number"
            />
          </InputGroup>
          <p className="fw-bold fs-1 text-center my-0">+</p>
          <InputGroup className="mb-3 px-5">
            <InputGroup.Text variant="primary">$BNB</InputGroup.Text>
            <Form.Control
              placeholder="$BNB Amount"
              aria-label="$BNB Amount"
              value={bAmount}
              onChange={handleBAmount}
              style={{
                borderTopRightRadius: "1rem",
                borderBottomRightRadius: "1rem",
              }}
              type="number"
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <AddLiquidityButton
            dAmount={dAmount}
            bAmount={bAmount}
            setModalShow={setModalShow}
          />
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}

export default TaxFreePairing;
