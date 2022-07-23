import React, { useState, useEffect } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import pendingRewardsABI from "./PendingRewardsABI";

/* global BigInt */

function PendingRewards(props) {
  const contractProcessor = useWeb3ExecuteFunction();
  const [rewards, setRewards] = useState(0);
  const { account, isAuthenticated } = useMoralis();

  const pendingRewards = {
    contractAddress: props.vault,
    functionName: "pendingRewards",
    abi: pendingRewardsABI,
    params: { shareholder: account },
  };

  const fetchPendingRewards = async () => {
    await contractProcessor.fetch({
      params: pendingRewards,
      onSuccess: (data) => {
        setRewards(BigInt(data._hex).toString() / Math.pow(10, 18));
      },
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchPendingRewards();
    }, 15000);
    fetchPendingRewards();
    return () => clearInterval(interval);
  }, [account, isAuthenticated]);

  return (
    <>
      {isAuthenticated
        ? rewards.toFixed(2) + " " + props.earn
        : "0 " + props.earn}
    </>
  );
}

export default PendingRewards;
