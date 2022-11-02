import React from "react";
import { useNavigate } from "react-router-dom";

import HomePublic from "@/pages/public/HomePublic";
import SpinnersLoding from "@/widgets/SpinnersLoding";


type propsTypes = React.PropsWithChildren<{
  title?: string;
  loading?: boolean;
  disabled?: boolean
}>;

const ModalAuth: React.FC<propsTypes> = ({ children, title, loading, disabled }) => {
  const navigate = useNavigate();
  
  return (
    <div className="modalAuth">
      <div className="modal-global modal-auth-global">
        {loading && <SpinnersLoding isLoading={loading as boolean} nameClass={loading ? "" : "displayNone"} />}
        <div className="modal-container">
          <div className="modal-header">
            <div className="icon-and-title">
              <div className="icon-closed">
                <div className="img" onClick={() => navigate(disabled ? "" : "/")}>
                  <img src="/static/svg/close.svg" alt="" />
                </div>
              </div>
            </div>
            <div className="title-modal">
              {title && <h1>{title}</h1>}
            </div>
          </div>
          <div className="modal-content">{children}</div>
        </div>
      </div>
      <HomePublic />
    </div>
  );
};

export default ModalAuth;
