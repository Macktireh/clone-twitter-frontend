export interface ILogin {
  email: string;
  password: string;
}

export interface ISignUp extends ILogin {
  firstName: string;
  lastName: string;
  confirmPassword: string;
}

export interface IToken {
  access: string | null;
  refresh: string | null;
}

export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export interface IUserProfile {
  user: IUser;
  pseudo: string;
  birthDate?: string;
  coverPicture?: string;
  uid: string;
  bio?: string;
  picture?: string;
  updated?: string;
  following?: string[];
}

export interface IState {
  isAuthenticated: boolean | null;
  currentUser: IUserProfile | null;
}

export interface IAction {
  type: string;
  payload?: any;
  loadUser?: (args?: any) => void;
}

export type TauthState = { userReducer: IState };

export type TcheckError = { validate: boolean; detail: string };
