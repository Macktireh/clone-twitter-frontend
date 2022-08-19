import * as React from "react";

import ButtonCustom from "@/components/widgets/ButtonCustom";

const Follow: React.FC = () => {
  return (
    <div className="Follow">
      <div className="left">
        <div className="img-container">
          <img src="/static/img/profilePic.png" alt="" />
        </div>
        <div className="info-container">
          <strong>Macktireh AS</strong>
          <p>@macktireh</p>
        </div>
      </div>
      <div className="right">
        <ButtonCustom text="Follow" />
      </div>
    </div>
  );
};

export default Follow;
