import React, { Dispatch } from "react";
import { useDispatch } from "react-redux";
import { AnyAction } from "redux";

import ButtonCustom from "@/widgets/ButtonCustom";
import addFollowingAction from "@/actions/follow/addFollowing.action";
import getAllFollowingAction from "@/actions/follow/getAllFollowing.action";
import getAllFollowersAction from "@/actions/follow/getAllFollowers.action";
import getCurrentUserAction from "@/actions/user/getCurrentUser.action";
import getAllUsersAction from "@/actions/user/getAllUsers.action";
import getPeopleConnect from "@/actions/follow/getPeopleConnect.action";

type propsTypes = {
  typeFollow: number;
  userPubblicId: string;
  userFollowing: string;
};

const ButtonFollow: React.FC<propsTypes> = ({ typeFollow, userPubblicId, userFollowing }) => {
  const dispatch = useDispatch();

  const handleFollow = async () => {
    await dispatch(addFollowingAction(userPubblicId, userFollowing) as Dispatch<AnyAction> | any);
    await dispatch(getCurrentUserAction() as Dispatch<AnyAction> | any);
    await dispatch(getAllUsersAction() as Dispatch<AnyAction> | any);
    dispatch(getPeopleConnect() as Dispatch<AnyAction> | any);
    dispatch(getAllFollowingAction(userPubblicId) as Dispatch<AnyAction> | any);
    dispatch(getAllFollowersAction(userPubblicId) as Dispatch<AnyAction> | any);
  };

  return (
    <div className={typeFollow === 2 ? "btnFollow transparent" : "btnFollow"}>
      <ButtonCustom text={typeFollow === 1 ? "Follow" : "Unfollow"} onClick={handleFollow} />
    </div>
  );
};

export default ButtonFollow;
