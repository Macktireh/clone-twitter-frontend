import { IBookmark, IComment, IPost } from "@/models/postAndComment";
import { IUser, IUserProfile } from "@/models/userProfile";
import { IFollow } from '@/models/follow';
import { INotif } from '@/models/notificationAndChat';

export interface IAuthReducer {
  isAuthenticated: boolean | null;
  currentUser: IUserProfile | null;
}

export type TUsersReducerType = IUserProfile[] | null;

export type TPostReducerType = IPost[] | null;

export type TLikesPostReducerType = IUser[] | null;

export type TBookmarkReducerType = IBookmark[] | null;

export type TCommentReducerType = IComment[] | null;

export type TNotifReducerType = INotif[] | null;

export type TFollowReducerType = {
  following: IFollow[] | null
  followers: IFollow[] | null
  peopleConnect: IUser[] | null
};

export interface IRootState {
  authReducer: IAuthReducer;
  postReducer: TPostReducerType;
  userReducer: TUsersReducerType;
  mylLikesPostReducer: TPostReducerType;
  postDetailsReducer: IPost;
  commentReducer: TCommentReducerType;
  followReducer: TFollowReducerType;
  notificationReducer: TNotifReducerType;
  bookmarkReducer: TBookmarkReducerType;
}

export interface IActionReducer {
  type: string;
  payload?: any;
}

export interface IPropsRootStateType {
  currentUser: IUserProfile | null;
  posts: IPost[] | null;
  users: IUserProfile[] | null;
  postsLikes: IPost[] | null;
  comments: IComment[] | null;
  following: IFollow[] | null;
  followers: IFollow[] | null;
  peopleConnect: IUser[] | null;
  // notification: INotif[] | null;
}
