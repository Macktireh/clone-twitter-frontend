import SignUp from "../pages/auth/SignUp";
import SignUpConfirm from "../pages/auth/SingUpConfirm";
import AccountActivation from "../pages/auth/AccountActivation";
import Login from "../pages/auth/Login";
import RequestResetPassword from "../pages/auth/RequestResetPassword";
import RequestResetPasswordConfirm from "../pages/auth/RequestResetPasswordConfirm";
import ResetPassword from "../pages/auth/ResetPassword";
import ResetPasswordConfirm from "../pages/auth/ResetPasswordConfirm";
import AccountActivationSuccess from "../pages/auth/AccountActivationSuccess";

export const authPath = {
  signup: "/auth/signup/",
  signupConfirm: "/auth/signup/confirm/",
  accountActivation: "/auth/account/activation/:uidb64/:token/",
  accountActivationSuccess: "/auth/account/activation/success/",
  login: "/auth/login/",
  requestResetPassword: "/auth/request/reset/password/",
  requestResetPasswordConfirm: "/auth/request/reset/password/confirm/",
  resetPassword: "/auth/reset/password/:uid/:token",
  resetPasswordConfirm: "/auth/reset/password/confirm/",
};

type TauthRoutes = { path: string; element: JSX.Element };

const authRoutes: TauthRoutes[] = [
  { path: authPath.signup, element: <SignUp /> },
  { path: authPath.signupConfirm, element: <SignUpConfirm /> },
  { path: authPath.accountActivation, element: <AccountActivation /> },
  { path: authPath.accountActivationSuccess, element: <AccountActivationSuccess /> },
  { path: authPath.login, element: <Login /> },
  { path: authPath.requestResetPassword, element: <RequestResetPassword /> },
  { path: authPath.requestResetPasswordConfirm, element: <RequestResetPasswordConfirm /> },
  { path: authPath.resetPassword, element: <ResetPassword /> },
  { path: authPath.resetPasswordConfirm, element: <ResetPasswordConfirm /> },
];

export default authRoutes;
