import { IPost } from "@/models/postAndComment";
import { IUserProfile } from "@/models/userProfile";

export interface IAuthReducer {
  isAuthenticated: boolean | null;
  currentUser: IUserProfile | null;
}

export type TUsersReducerType = IUserProfile[] | null;

export type TPostReducerType = IPost[] | null;

export interface IRootState {
  authReducer: IAuthReducer;
  postReducer: TPostReducerType;
  userReducer: TUsersReducerType;
}

export interface IActionReducer {
  type: string;
  payload?: any;
}

export interface IPropsRootStateType {
  currentUser: IUserProfile | null;
  posts: IPost[] | null;
  users: IUserProfile[] | null;
}
