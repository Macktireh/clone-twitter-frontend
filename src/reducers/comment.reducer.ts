import * as Types from "@/actions/types";
import { IActionReducer, IComment, TCommentReducerType } from "@/models";

const initialState: TCommentReducerType = null;

const commentReducer = (state: TCommentReducerType = initialState, action: IActionReducer): TCommentReducerType => {
  const { type, payload } = action;

  switch (type) {
    case Types.GET_ALL_COMMENT_SUCCESS:
      return payload;

    case Types.ADD_NEW_COMMENT_SUCCESS:
      return [...(state as IComment[]), payload];

    case Types.UPDATE_COMMENT_SUCCESS:
      const updatePost = state?.slice();
      updatePost?.filter((post) => {
        if (post.publicId === payload.publicId) {
          post.message = payload.message;
          post.image = payload.image;
          // post.image = payload.image ? baseURL + payload.image : payload.image;
        }
        return post;
      });
      return updatePost as IComment[];

    case Types.DELETE_COMMENT_SUCCESS:
      return state?.filter((post) => post.publicId !== payload) as IComment[];

    case Types.LIKE_OR_UNLIKE_POST_SUCCESS:
      const likePost = state?.slice();
      likePost?.map((post) => {
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
      return likePost as IComment[];

    case Types.ADD_NEW_COMMENT_FAIL:
    case Types.DELETE_COMMENT_FAIL:
    // case Types.LIKE_OR_UNLIKE_COMMENT_FAIL:
      return state;

    case Types.GET_ALL_COMMENT_FAIL:
      return null;

    default:
      return state;
  }
};

export default commentReducer;
