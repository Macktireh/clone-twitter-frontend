import * as Types from "@/actions/types";
import { IActionReducer, IPost, TPostReducerType } from "@/models";

const initialState: TPostReducerType = null;

const postReducer = (state: TPostReducerType = initialState, action: IActionReducer): TPostReducerType => {
  const { type, payload } = action;

  switch (type) {
    case Types.GET_ALL_POST_SUCCESS:
      return payload;

    case Types.ADD_NEW_POST_SUCCESS:
      return [...(state as IPost[]), payload];

    case Types.UPDATE_POST_SUCCESS:
      const updatePost = state?.slice();
      updatePost?.filter((post) => {
        if (post.publicId === payload.publicId) {
          post.body = payload.body;
          post.image = payload.image;
        }
        return post;
      });
      return updatePost as IPost[];

    case Types.DELETE_POST_SUCCESS:
      return state?.filter((post) => post.publicId !== payload) as IPost[];

    case Types.LIKE_OR_UNLIKE_POST_SUCCESS:
      const updatedLikePost = state?.map((post) => {
        if (post.publicId === payload.PublicId) {
          if (payload.value === "Like") {
            return {
              ...post,
              liked: [...post.liked, payload.authorDetail],
            };
          } else if (payload.value === "Unlike") {
            return {
              ...post,
              liked: post.liked.filter((like) => like.public_id !== payload.authorDetail.public_id),
            };
          }
        }
        return post;
      });
      return [...(updatedLikePost as IPost[])];

    case Types.ADD_BOOKMARK_SUCCESS:
      const posts = state?.slice();
      posts?.map((post) => {
        if (post.publicId === payload.posts.publicId) {
          if (post.bookmarks.includes(payload.userPublicId)) {
            post.bookmarks.splice(post.bookmarks.indexOf(payload.userPublicId), 1);
          } else {
            post.bookmarks.push(payload.userPublicId);
          }
          return post;
        }
        return post;
      });
      return [...(posts as IPost[])];

    case Types.ADD_NEW_POST_FAIL:
    case Types.ADD_BOOKMARK_FAIL:
    case Types.DELETE_POST_FAIL:
    case Types.LIKE_OR_UNLIKE_POST_FAIL:
      return state;

    case Types.GET_ALL_POST_FAIL:
      return null;

    default:
      return state;
  }
};

export default postReducer;
