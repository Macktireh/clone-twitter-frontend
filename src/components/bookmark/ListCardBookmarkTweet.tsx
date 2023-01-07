import React from "react";

import { IUserProfile } from "@/models";
import CardTweet from "@/components/homePrivate/CardTweet";
import SpinnersLoding from "@/widgets/SpinnersLoding";
import { IPost } from "../../models/postAndComment";

type propsTypes = {
  currentUser: IUserProfile | null;
  posts: IPost[] | null;
  users: IUserProfile[] | null;
};

const styleSpinnersLoding: React.CSSProperties = {
  top: "20%",
};

const ListBookmarkTweet: React.FC<propsTypes> = ({ currentUser, users, posts }) => {
  return (
    <>
      {!currentUser && !users && !posts ? (
        <SpinnersLoding
          isLoading={!currentUser && !users && !posts ? true : false}
          styleSpinnersLoding={styleSpinnersLoding}
        />
      ) : (
        posts?.map((post) =>
          post.bookmarks.includes(currentUser?.user.public_id as string) ? (
            <div className="list-post">
              <CardTweet key={post.publicId} currentUser={currentUser} post={post} users={users} />
            </div>
          ) : null
        )
      )}
    </>
  );
};

export default ListBookmarkTweet;
