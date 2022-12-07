import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import pairABI from "./PairABI";
import { addDecimals } from "../../../helpers/formatters";
import allowanceABI from "./AllowanceABI";
import approveABI from "./ApproveABI";

/* global BigInt */

function AddLiquidityButton(props) {
  const [isApproved, setIsApproved] = useState(false);

  const options = {
    contractAddress: "0x7FEb04e7f56352E4BE965b70E4775Ab95D43dE85",
    functionName: "pair",
    abi: pairABI,
    params: {
      amount: BigInt(Number(addDecimals(props.dAmount, 18).toFixed(0))),
    },
    msgValue: BigInt(Number(addDecimals(props.bAmount, 18).toFixed(0))),
  };
  const contractProcessor = useWeb3ExecuteFunction();
  const { account, Moralis, authenticate, isAuthenticated } = useMoralis();
  const { data, error, fetch, isFetching, isLoading } =
    useWeb3ExecuteFunction(options);

  const addLiquidity = async () => {
    await fetch({
      onSuccess: (result) => {
        console.log(result);
        props.setModalShow(false);
      },
    });
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
        console.log(error);
      },
      onSuccess: () => setIsApproved(true),
    });
  };

  const allowance = {
    contractAddress: "0x6b8a384dde6fc779342fbb2e4a8ecf73ed18d151",
    functionName: "allowance",
    abi: allowanceABI,
    params: {
      holder: account,
      spender: "0x7feb04e7f56352e4be965b70e4775ab95d43de85",
    },
  };

  const approve = {
    contractAddress: "0x6b8a384dde6fc779342fbb2e4a8ecf73ed18d151",
    functionName: "approve",
    abi: approveABI,
    params: {
      spender: "0x7feb04e7f56352e4be965b70e4775ab95d43de85",
      amount: BigInt(Math.pow(2, 128) - 1),
    },
  };

  useEffect(() => {
    fetchAllowance();
  }, []);

  if (!isApproved) {
    return (
      <Button variant="primary" className="w-100" onClick={fetchApprove}>
        Approve
      </Button>
    );
  } else {
    return (
      <>
        <Button
          variant="primary"
          className="ms-auto me-auto w-100"
          onClick={addLiquidity}
          disabled={isLoading}
        >
          Add Liquidity
        </Button>
      </>
    );
  }
}

export default AddLiquidityButton;
