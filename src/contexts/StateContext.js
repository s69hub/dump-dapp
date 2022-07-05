import React, { createContext, useState } from "react";

export const StateContext = createContext();

export const StateProvider = (props) => {
  const [refresh, setRefresh] = useState(0);

  return (
    <StateContext.Provider
      value={{
        refresh,
        setRefresh,
      }}
    >
      {props.children}
    </StateContext.Provider>
  );
};

export default StateContext;
