import * as Types from "@/actions/types";
import { IPost, PostReducerType } from "@/models";

const initialState: PostReducerType = null;

const postReducer = (state: PostReducerType = initialState, action: any): PostReducerType => {
  const { type, payload } = action;

  switch (type) {
    case Types.GET_ALL_POST_SUCCESS:
      return payload;

    case Types.ADD_NEW_POST_SUCCESS:
      return [...(state as IPost[]), payload];

    case Types.LIKE_OR_UNLIKE_POST_SUCCESS:
      const postCopy = state?.slice();
      postCopy?.map((post) => {
        if (post.publicId === payload.PublicId) {
          if (payload.value === "Like") {
            post.liked.push(payload.authorDetail);
            return post;
          } else if (payload.value === "Unlike") {
            post.liked = post.liked.filter((like) => like.public_id !== payload.authorDetail.public_id);
            return post;
          }
        }
        return post;
      });
      return postCopy as IPost[];

    case Types.ADD_NEW_POST_FAIL:
    case Types.LIKE_OR_UNLIKE_POST_FAIL:
      return state;

    case Types.GET_ALL_POST_FAIL:
      return [];

    default:
      return state;
  }
};

export default postReducer;
