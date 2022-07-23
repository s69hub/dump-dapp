import React, { useState, useEffect } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import balanceOfABI from "./BalanceOfABI";

/* global BigInt */

function TotalDeposit(props) {
  const [totalDeposit, setTotalDeposit] = useState(0);
  const contractProcessor = useWeb3ExecuteFunction();
  const { account, isAuthenticated } = useMoralis();

  const fetchTotalDeposit = async () => {
    await contractProcessor.fetch({
      params: balanceOf,
      onSuccess: (result) => {
        setTotalDeposit(BigInt(result._hex).toString() / Math.pow(10, 18));
      },
    });
  };

  const balanceOf = {
    contractAddress: props.vault,
    functionName: "balanceOf",
    abi: balanceOfABI,
    params: { account: account },
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchTotalDeposit();
    }, 20000);
    fetchTotalDeposit();
    return () => clearInterval(interval);
  }, [account, isAuthenticated]);

  return (
    <span className="text-warning">
      {isAuthenticated ? totalDeposit.toFixed(9) : "0"}
    </span>
  );
}

export default TotalDeposit;
