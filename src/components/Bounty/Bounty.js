import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import currentBountyABI from "./CurrentBountyABI";
import triggerABI from "./TriggerABI";
import { limitDigits } from "../../helpers/formatters";

/* global BigInt */

function Bounty() {
  const { account, Moralis, isAuthenticated } = useMoralis();
  const contractProcessor = useWeb3ExecuteFunction();

  const fetchBounty = async () => {
    if (!isAuthenticated) {
      await Moralis.enableWeb3();
    }

    await contractProcessor.fetch({
      params: {
        contractAddress: "0xf09199b386607ea06912e6ddccfacaa8996c02cb",
        functionName: "currentBounty",
        abi: currentBountyABI,
        params: {},
      },
      onSuccess: (result) => {
        if (result > 0) {
          setBounty(
            limitDigits(BigInt(result._hex).toString() / Math.pow(10, 18), 3)
          );
        } else {
          setBounty(0);
        }
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  const handleTrigger = async () => {
    await contractProcessor.fetch({
      params: {
        contractAddress: "0xf09199b386607ea06912e6ddccfacaa8996c02cb",
        functionName: "trigger",
        abi: triggerABI,
        params: {},
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  const [bounty, setBounty] = useState(0);

  useEffect(() => {
    fetchBounty();
    const interval = setInterval(() => {
      fetchBounty();
    }, 3000);
    return () => clearInterval(interval);
  }, [account]);

  return (
    <Button variant="primary" onClick={handleTrigger}>
      Grab {bounty} BNB
    </Button>
  );
}

export default Bounty;
