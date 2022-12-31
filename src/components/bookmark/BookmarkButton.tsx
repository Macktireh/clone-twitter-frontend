import React from "react";
import { useDispatch } from "react-redux";

import IconSVG from "@/widgets/IconSVG";
import addPostBookmark from "@/actions/bookmark/AddPostBookmark.action";
// import getAllPostAction from "@/actions/post/getAllPost.action";
import { IPost, IUserProfile } from "@/models";

type propsTypes = {
  currentUser: IUserProfile | null;
  post: IPost | null;
};

const BookmarkButton: React.FC<propsTypes> = ({ currentUser, post }) => {
  const dispatch = useDispatch();

  const handleClick = async () => {
    post && dispatch(addPostBookmark(post.publicId) as any);
    // dispatch(getAllPostAction() as any);
  }

  return (
    <div className="share post-icon" onClick={handleClick}>
      {currentUser && post && post.bookmarks.includes(currentUser.user.public_id) ? (
        <IconSVG iconName="bookmarkActive" />
      ) : (
        <IconSVG iconName="bookmark" fill="#919090" />
      )}
    </div>
  );
};

export default BookmarkButton;
