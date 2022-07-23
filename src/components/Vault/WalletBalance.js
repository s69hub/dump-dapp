import React, { useState, useEffect } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import balanceOfABI from "./BalanceOfABI";

/* global BigInt */

function WalletBalance(props) {
  const [balance, setBalance] = useState(0);
  const contractProcessor = useWeb3ExecuteFunction();
  const { account, isAuthenticated } = useMoralis();

  const fetchWalletBalance = async () => {
    if (!isAuthenticated) {
      setBalance(0);
    }
    await contractProcessor.fetch({
      params: balanceOf,
      onSuccess: (result) => {
        setBalance(BigInt(result._hex).toString() / Math.pow(10, 18));
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  const balanceOf = {
    contractAddress: props.tokenAddress,
    functionName: "balanceOf",
    abi: balanceOfABI,
    params: { account: account },
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchWalletBalance();
    }, 15000);
    fetchWalletBalance();

    return () => clearInterval(interval);
  }, [account, isAuthenticated]);

  return (
    <span className="text-warning">{isAuthenticated ? balance : "0"}</span>
  );
}

export default WalletBalance;
