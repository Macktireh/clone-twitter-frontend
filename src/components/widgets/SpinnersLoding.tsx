import * as React from "react";

import ScaleLoader from "react-spinners/ScaleLoader";

const override: React.CSSProperties = {
  display: "block",
  margin: "0 auto",
};

type TSipinner = {isLoading: boolean, nameClass?: string}

const SpinnersLoding: React.FC<TSipinner> = ({ nameClass, isLoading }) => {
  return (
    <div className={nameClass ? "spinners-container" + nameClass : "spinners-container"}>
      <ScaleLoader color={"#1d9bf0"} loading={isLoading} cssOverride={override} />
    </div>
  );
};

export default SpinnersLoding;
