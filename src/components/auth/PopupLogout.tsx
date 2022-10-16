import React from "react";
import { useDispatch } from "react-redux";

import UserCard from "@/components/navbar/UserCard";
import IconSVG from "@/widgets/IconSVG";
import logoutAction from "@/actions/auth/logout.action";
import { IUserProfile } from "@/models";

type propsTypes = React.PropsWithChildren<{
  currentUser?: IUserProfile | null;
  handleClose?: () => void;
  dispatch?: any;
}>;

const PopupLogout: React.FC<propsTypes> = ({ currentUser, handleClose, dispatch }) => {
  const handleLogout = () => {
    dispatch && dispatch(logoutAction(currentUser?.user.public_id as string));
  };
  return (
    <div className="PopupLogout">
      <div className="content">
        <div className="user-card">
          <UserCard currentUser={currentUser}>
            <IconSVG iconName="ok" fill="#1d9bf0" />
          </UserCard>
        </div>
        <div className="add-account">
          <p>Ajouter un compte existant</p>
        </div>
        <div className="logout-btn" onClick={handleLogout}>
          <p>Log out @{currentUser?.pseudo}</p>
        </div>
      </div>
    </div>
  );
};

const PopupLogoutConnectWithStore: React.FC<propsTypes> = ({ currentUser }) => {
  const dispatch = useDispatch();
  return <PopupLogout currentUser={currentUser} dispatch={dispatch as any} />;
};

export default PopupLogoutConnectWithStore;
