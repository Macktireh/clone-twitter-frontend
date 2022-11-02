import React from "react";

import SimpleCardUser from "@/widgets/SimpleCardUser";
import ButtonFollow from "@/components/follow/ButtonFollow";
import { IUserProfile } from "@/models";

type propsTypes = React.PropsWithChildren<{
  currentUser?: IUserProfile | null;
  authorPost: IUserProfile | null;
}>;

const TooltipCardUser: React.FC<propsTypes> = ({ authorPost, currentUser }) => {
  return (
    <div className="TooltipCardUser">
      <div className="content">
        <SimpleCardUser userData={authorPost as IUserProfile} bio={true}>
          {authorPost?.user.public_id !== currentUser?.user.public_id && (
            <ButtonFollow
              typeFollow={currentUser?.following.includes(authorPost?.user.public_id as string) ? 2 : 1}
              userPubblicId={currentUser?.user.public_id as string}
              userFollowing={authorPost?.user.public_id as string}
            />
          )}
        </SimpleCardUser>
      </div>
    </div>
  );
};

export default TooltipCardUser;
