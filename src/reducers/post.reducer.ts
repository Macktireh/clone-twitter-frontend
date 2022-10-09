import * as Types from "@/actions/types";
import { baseURL } from "@/config/axios";
import { IPost, TPostReducerType } from "@/models";

const initialState: TPostReducerType = null;

const postReducer = (state: TPostReducerType = initialState, action: any): TPostReducerType => {
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
          post.image = payload.image ? baseURL + payload.image : payload.image;
        }
        return post;
      });
      return updatePost as IPost[];

    case Types.DELETE_POST_SUCCESS:
      return state?.filter((post) => post.publicId !== payload) as IPost[];

    case Types.LIKE_OR_UNLIKE_POST_SUCCESS:
      const likePost = state?.slice();
      likePost?.map((post) => {
        if (post.publicId === payload.PublicId) {
          if (payload.value === "Like") {
            post.liked.push(payload.authorDetail);
            return { ...post, liked: [...post.liked, payload.authorDetail] };
          } else if (payload.value === "Unlike") {
            post.liked = post.liked.filter((like) => like.public_id !== payload.authorDetail.public_id);
            console.log(post.liked);
            return post;
          }
        }
        return post;
      });
      return [...likePost as IPost[]];

    case Types.ADD_NEW_POST_FAIL:
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
