import React from "react";
import { Button } from "react-bootstrap";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import claimABI from "./ClaimABI";

function ClaimRewards(props) {
  const contractProcessor = useWeb3ExecuteFunction();
  const { account, isAuthenticated } = useMoralis();

  const fetchClaimRewards = async () => {
    await contractProcessor.fetch({
      params: claimRewards,
      onError: (error) => console.log(error),
    });
  };

  const claimRewards = {
    contractAddress: props.vault,
    functionName: "claimRewards",
    abi: claimABI,
    params: {},
  };
  return <Button onClick={fetchClaimRewards}>Claim</Button>;
}

export default ClaimRewards;
