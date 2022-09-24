export interface IAuthLogin {
  email: string;
  password: string;
}

export interface IAuthSignUp extends IAuthLogin {
  firstName: string;
  lastName: string;
  confirmPassword: string;
}
