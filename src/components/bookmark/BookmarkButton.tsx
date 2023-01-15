import React from "react";
import { useDispatch } from "react-redux";

import IconSVG from "@/widgets/IconSVG";
import addPostBookmark from "@/actions/bookmark/AddPostBookmark.action";
import getBookmarks from "@/actions/bookmark/getBookmarks.action";
import { useNotifyContext } from "@/context/NotifyProvider";
import { IPost, IUserProfile } from "@/models";

type propsTypes = {
  currentUser: IUserProfile | null;
  post: IPost | null;
};

const BookmarkButton: React.FC<propsTypes> = ({ currentUser, post }) => {
  const dispatch = useDispatch();
  const notifyContext = useNotifyContext();
  // const flag = React.useRef(false);

  const handleClick = async () => {
    if (post) {
      post.bookmarks.includes(currentUser?.user.public_id as string)
        ? notifyContext?.notify(notifyContext.typeNotify.default, "Tweet removed from your Bookmarks.")
        : notifyContext?.notify(notifyContext.typeNotify.default, "Tweet added to your Bookmarks.");
      await dispatch(addPostBookmark(post.publicId) as any);
      await dispatch(getBookmarks() as any);
    }
  };

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
