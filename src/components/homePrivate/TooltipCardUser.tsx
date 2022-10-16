import React from "react";

import ButtonCustom from "@/widgets/ButtonCustom";
import { IUserProfile } from "@/models";
import SimpleCardUser from "@/widgets/SimpleCardUser";

type propsTypes = React.PropsWithChildren<{
  currentUser?: IUserProfile | null;
  authorPost: IUserProfile | null;
}>;

const TooltipCardUser: React.FC<propsTypes> = ({ authorPost, currentUser }) => {
  const handleFollowing = () => {
    console.log("Following : ", authorPost?.user.public_id !== currentUser?.user.public_id);
  };
  return (
    <div className="TooltipCardUser">
      <div className="content">
        <SimpleCardUser
          userData={authorPost as IUserProfile}
          bio={true}
        >
          {authorPost?.user.public_id !== currentUser?.user.public_id && (
            <ButtonCustom text="Following" handleClick={handleFollowing} />
          )}
        </SimpleCardUser>
      </div>
    </div>
  );
};

export default TooltipCardUser;
