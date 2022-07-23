import React, { Fragment, useState, useEffect } from "react";
import { useWeb3ExecuteFunction, useMoralis } from "react-moralis";
import timeUntileUnlockABI from "./TimeUntilUnlockABI";
import Countdown from "react-countdown";

/* global BigInt */

function TimeUntilUnlock(props) {
  const [timeUU, setTimeUU] = useState(0);
  const contractProcessor = useWeb3ExecuteFunction();
  const { account } = useMoralis();

  const timeUntilUnlock = {
    contractAddress: props.vault,
    functionName: "timeUntilUnlock",
    abi: timeUntileUnlockABI,
    params: { user: account },
  };

  const fetchTimeUntilUnlock = async () => {
    await contractProcessor.fetch({
      params: timeUntilUnlock,
      onSuccess: (result) => {
        const TUU = BigInt(result._hex).toString() * 1000 * 3;
        setTimeUU(TUU);
      },
    });
  };

  useEffect(() => {
    fetchTimeUntilUnlock();
  }, [account]);

  return (
    <Fragment>
      {timeUU > 0 && (
        <p>
          Unlocks In{" "}
          <Countdown
            date={Date.now() + timeUU}
            onComplete={fetchTimeUntilUnlock}
          />{" "}
          <br />
          <small>
            <span className="text-warning">Early withdraw fee: 5%</span>
          </small>
        </p>
      )}
    </Fragment>
  );
}

export default TimeUntilUnlock;
