import { combineReducers } from "redux";

import authReducer from "@/reducers/auth.reducer";
import userReducer from "@/reducers/user.reducer";
import postReducer from "@/reducers/post.reducer";
import mylLikesPostReducer from "@/reducers/myLikesPost.reducer";
// import postDetailsReducer from "@/reducers/postDetails.reducer";
import commentReducer from "@/reducers/comment.reducer";

export default combineReducers({
  authReducer,
  userReducer,
  postReducer,
  // postDetailsReducer,
  mylLikesPostReducer,
  commentReducer,
});
