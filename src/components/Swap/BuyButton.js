import React from "react";
import { Button, Spinner } from "react-bootstrap";
import { useWeb3Transfer } from "react-moralis";

/*global BigInt*/

function BuyButton(props) {
  const { fetch, error, isFetching } = useWeb3Transfer({
    type: "native",
    amount: BigInt(props.amount),
    receiver: process.env.REACT_APP_DUMP_CONTRACT,
  });
  return (
    <Button
      variant="success"
      className="mb-3 shadow-sm"
      onClick={fetch}
      disabled={isFetching}
    >
      {isFetching ? <Spinner animation="border" size="sm" /> : "BUY NOW!"}
    </Button>
  );
}

export default BuyButton;
