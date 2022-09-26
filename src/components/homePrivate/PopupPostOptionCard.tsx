import React from "react";
import { useDispatch } from "react-redux";

import IconSVG from "@/widgets/IconSVG";
import deletePostAction from "@/actions/post/deletePost.action";
import { IUserProfile, IPost } from "@/models";

type PropsType = {
  type: string;
  currentUser: IUserProfile | null;
  post: IPost | null;
};

const PopupPostOrCommentOptionCard: React.FC<PropsType> = ({ type, currentUser, post }) => {
  const dispatch = useDispatch();

  const handleDelete = async (public_id: string) => {
    if (type === "post") if (window.confirm("Are you sure you want to delete?")) dispatch(deletePostAction(public_id) as any);
  };

  const rederElement = (): JSX.Element | null => {
    if (currentUser && post) {
      if (type === "post") {
        if (post.authorDetail.public_id === currentUser.user.public_id) {
          return (
            <>
              <div className="items delete" onClick={() => handleDelete(post.publicId)}>
                <IconSVG iconName="delete" fill="#F4212E" />
                <span>Delete</span>
              </div>
              <div className="items" onClick={() => handleDelete(post.publicId)}>
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
        }
      }
    }
    return null;
  };

  return <div className="PopupPostOrCommentOptionCard">{rederElement()}</div>;
};

export default PopupPostOrCommentOptionCard;
