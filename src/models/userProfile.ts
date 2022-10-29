export interface IUser {
  public_id: string;
  first_name: string;
  last_name: string;
  pseudo: string;
  profilePicture: string | null;
  bio: string | null;
}

export interface IUserProfile {
  user: IUser;
  pseudo: string;
  birthDate?: string | null;
  profilePicture: string | null;
  coverPicture: string | null;
  bio: string | null;
  followers: string[];
  following: string[];
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
