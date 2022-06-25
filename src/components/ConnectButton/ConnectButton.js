import React, { useEffect, useState } from "react";
import { Button, Container, Col, Row, Modal } from "react-bootstrap";
import { useChain, useMoralis } from "react-moralis";
import { getEllipsisTxt } from "../../helpers/formatters";
import { WalletModal } from "web3uikit";

function Wallet() {
  const [buttonText, setButtonText] = useState("Connect Wallet");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { switchNetwork } = useChain();
  const { authenticate, user, account, chainId, isAuthenticated, logout } =
    useMoralis();

  useEffect(() => {
    if (!isAuthenticated) {
      setButtonText("Connect Wallet");
    } else {
      const userAddress = getEllipsisTxt(account, 4);
      setButtonText(userAddress);
    }
  }, [account, user]);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {buttonText}
      </Button>

      {!isAuthenticated && (
        <WalletModal
          moralisAuth
          chainId={56}
          isOpened={show}
          setIsOpened={setShow}
          key="walletModal"
          signingMessage="Welcome to DUMP!"
        />
      )}

      {isAuthenticated && (
        <Modal
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={show}
          onHide={handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Disconnect</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container className="text-center">
              <Row>
                <Col lg={12}>{account ? account : ""}</Col>
                <Col lg={12} className="mb-2">
                  {/* <Balances /> */}
                </Col>
                <Col lg={12}>
                  <Button variant="danger" onClick={logout}>
                    Disconnect
                  </Button>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}

export default Wallet;
