export interface IUser {
  public_id: string;
  first_name: string;
  last_name: string;
}

export interface IUserProfile {
  user: IUser;
  pseudo: string;
  birthDate?: string | null;
  profilePicture: string | null;
  coverPicture: string | null;
  bio: string | null;
  numberOfFollowers: number;
  numberOfFollowing: number;
  updated: string;
  created: string;
}

export type TTabState = { id: number; title: string; grow: boolean };

export interface IEditUserData {
  first_name: string;
  last_name: string;
  pseudo: string;
  bio: string;
}

export type pictureType = {
  profilePicture?: any;
  coverPicture?: any;
};
