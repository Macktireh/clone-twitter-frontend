import { combineReducers } from "redux";

import authReducer from "@/reducers/auth.reducer";
import userReducer from "@/reducers/user.reducer";
import postReducer from "@/reducers/post.reducer";
import mylLikesPostReducer from "@/reducers/myLikesPost.reducer";
import commentReducer from "@/reducers/comment.reducer";
import followReducer from "@/reducers/follow.reducer";
import notificationReducer from "@/reducers/notification.reducer";
import bookmarkReducer from "@/reducers/bookmark.reducer";
import messageReducer from "@/reducers/message.reducer";

export default combineReducers({
  authReducer,
  userReducer,
  postReducer,
  mylLikesPostReducer,
  commentReducer,
  followReducer,
  notificationReducer,
  bookmarkReducer,
  messageReducer,
});
