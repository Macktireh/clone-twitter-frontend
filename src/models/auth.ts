export interface IAuthUserLogin {
  email: string;
  password: string;
}

export interface IAuthUserSignUp extends IAuthUserLogin {
  firstName: string;
  lastName: string;
  confirmPassword: string;
}

export interface IAuthUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export interface IAuthUserProfile {
  user: IAuthUser;
  pseudo: string;
  birthDate: string | null;
  coverPicture: string;
  uid: string;
  bio: string;
  picture: string;
  updated: string;
  following: string[];
}

export interface IAuthUserState {
  isAuthenticated: boolean | null;
  currentUser: IAuthUserProfile | null;
}

export interface IAuthUserAction {
  type: string;
  payload?: any;
  loadUser?: (args?: any) => void;
}

export type TAuthUserReducer = { userReducer: IAuthUserState };

// export type TCheckError = { validate: boolean; detail: string };
