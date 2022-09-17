import { combineReducers } from "redux";

import authReducer from "@/reducers/auth.reducer";
import postReducer from "@/reducers/post.reducer";
import userReducer from "@/reducers/user.reducer";

export default combineReducers({
  authReducer,
  userReducer,
  postReducer,
});
