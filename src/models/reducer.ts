import { IPost } from "@/models/postAndComment";
import { IUserProfile } from "@/models/userProfile";

export interface IAuthReducer {
  isAuthenticated: boolean | null;
  currentUser: IUserProfile | null;
}

export type IUsersReducerType = IUserProfile[] | null;

export type PostReducerType = IPost[] | null;

export interface IRootState {
  authReducer: IAuthReducer;
  postReducer: PostReducerType;
  userReducer: IUsersReducerType;
}

export interface IActionReducer {
  type: string;
  payload?: any;
}

export interface PropsRootStateType {
  currentUser: IUserProfile | null;
  posts: IPost[] | null;
  users: IUserProfile[] | null;
}
