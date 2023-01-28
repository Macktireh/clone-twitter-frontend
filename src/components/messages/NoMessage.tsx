import React from "react";

import ButtonCustom from "@/widgets/ButtonCustom";

type propsTypes = {
  h2: string;
  p: string;
  textBtn: string;
};

const NoMessage: React.FC<propsTypes> = ({ h2, p, textBtn }) => {
  return (
    <div className="not-msg">
      <h2>{h2}</h2>
      <p>{p}</p>
      <ButtonCustom text={textBtn} />
    </div>
  );
};

export default NoMessage;
