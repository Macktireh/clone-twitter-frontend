import * as Types from "@/actions/types";
import { IActionReducer, IUser, TLikesPostReducerType } from "@/models";

const initialState: TLikesPostReducerType = null;

const likesPostReducer = (state: TLikesPostReducerType = initialState, action: IActionReducer): TLikesPostReducerType => {
  const { type, payload } = action;

  switch (type) {

    case Types.GET_LIKE_OR_UNLIKE_POST_SUCCESS:
      return payload
    
    case Types.UPDATE_LIKE_OR_UNLIKE_POST_SUCCESS:
      const likePost = state?.slice();
      // let likes: IUser[];

      if (payload.value === "Like") {
        return [...likePost as IUser[], payload.authorDetail];
        // likes = likePost?.push(payload.authorDetail);
        // console.log(likePost);
        // return likePost as IUser[];
      } else if (payload.value === "Unlike") {
        // console.log(likePost);
        return likePost?.filter((like) => like.public_id !== payload.authorDetail.public_id)  as IUser[];
      } else return state;

    case Types.GET_LIKE_OR_UNLIKE_POST_FAIL:
    case Types.UPDATE_LIKE_OR_UNLIKE_POST_FAIL:
      return state;

    default:
      return state;
  }
};

export default likesPostReducer;
