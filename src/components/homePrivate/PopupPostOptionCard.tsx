import React from "react";

import IconSVG from "@/widgets/IconSVG";
import { IUserProfile, IPost, IComment } from "@/models";
import { useTweet } from "@/context/TweetProvider";

type propsTypes = {
  type: string;
  currentUser: IUserProfile | null;
  post: IPost | IComment | null;
};

const PopupPostOrCommentOptionCard: React.FC<propsTypes> = ({ type, currentUser, post }) => {
  const propsContext = useTweet();

  const handleEditing = async (public_id: string) => {
    if (propsContext) {
      propsContext.publicIdState.setPublicId(public_id);
      propsContext.isEditState.setIsEditing();
      propsContext.modal.setModalActive();
    }
  };

  const handleConfirmDelete = async (public_id: string) => {
    if (propsContext) {
      propsContext.publicIdState.setPublicId(public_id);
      propsContext.popupDelete.setPopupActiveDelete();
    }
  };

  const rederElement = (): JSX.Element | null => {
    if (currentUser && post) {
        if (post.authorDetail.public_id === currentUser.user.public_id) {
          return (
            <>
              <div className="items delete" onClick={() => handleConfirmDelete(post.publicId)}>
                <IconSVG iconName="delete" fill="#F4212E" />
                <span>Delete</span>
              </div>
              <div className="items" onClick={() => handleEditing(post.publicId)}>
                <IconSVG iconName="edit" fill="#919090" />
                <span>Edit</span>
              </div>
              <div className="items pin">
                <IconSVG iconName="pin" fill="#919090" />
                <span>Pin to your profile</span>
              </div>
              <div className="items add-remove">
                <IconSVG iconName="lists-plus" fill="#919090" />
                <span>Add/Remove @{currentUser?.pseudo} from Lists</span>
              </div>
              <div className="items msg">
                <IconSVG iconName="msg" fill="#919090" />
                <span>Change who can reply</span>
              </div>
              <div className="items embed">
                <IconSVG iconName="embed" fill="#919090" />
                <span>Embed Tweet</span>
              </div>
              <div className="items analytics">
                <IconSVG iconName="analytics" fill="#919090" />
                <span>View Tweet Analytics</span>
              </div>
            </>
          );
        } else {
          return (
            <>
              {/* <div className="items delete" onClick={() => handleConfirmDelete(post.publicId)}>
                <IconSVG iconName="delete" fill="#F4212E" />
                <span>Delete</span>
              </div>
              <div className="items" onClick={() => handleEditing(post.publicId)}>
                <IconSVG iconName="edit" fill="#919090" />
                <span>Edit</span>
              </div> */}
              <div className="items pin">
                <IconSVG iconName="pin" fill="#919090" />
                <span>Pin to your profile</span>
              </div>
              <div className="items add-remove">
                <IconSVG iconName="lists-plus" fill="#919090" />
                <span>Add/Remove @{currentUser?.pseudo} from Lists</span>
              </div>
              <div className="items msg">
                <IconSVG iconName="msg" fill="#919090" />
                <span>Change who can reply</span>
              </div>
              <div className="items embed">
                <IconSVG iconName="embed" fill="#919090" />
                <span>Embed Tweet</span>
              </div>
              <div className="items analytics">
                <IconSVG iconName="analytics" fill="#919090" />
                <span>View Tweet Analytics</span>
              </div>
            </>
          );
        }
    }
    return null;
  };

  return <div className="PopupPostOrCommentOptionCard">{rederElement()}</div>;
};

export default PopupPostOrCommentOptionCard;
