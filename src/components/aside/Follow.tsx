import React from "react";

import ButtonCustom from "@/widgets/ButtonCustom";

const Follow: React.FC = () => {
  return (
    <div className="Follow">
      <div className="left">
        <div className="img-container">
          <img src="https://res.cloudinary.com/doysjtoym/image/upload/v1665693389/cloneTwitter/default/profilePic_hbvouc.png" alt="" />
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
