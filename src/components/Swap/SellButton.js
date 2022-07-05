import React from "react";
import { Button, Spinner } from "react-bootstrap";
import { useWeb3Transfer, useMoralis } from "react-moralis";

/*global BigInt*/

function SellButton(props) {
  const { account } = useMoralis();
  const { fetch, error, isFetching } = useWeb3Transfer({
    amount: BigInt(props.amount),
    receiver: account,
    type: "erc20",
    contractAddress: process.env.REACT_APP_DUMP_CONTRACT,
  });

  return (
    <>
      <Button
        variant="danger"
        className="mb-3 shadow-sm"
        onClick={fetch}
        disabled={isFetching}
      >
        {isFetching ? <Spinner animation="border" size="sm" /> : "SELL NOW!"}
      </Button>
    </>
  );
}

export default SellButton;
