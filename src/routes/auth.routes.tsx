import SignUp from "@/pages/auth/SignUp";
import SignUpConfirm from "@/pages/auth/SingUpConfirm";
import AccountActivation from "@/pages/auth/AccountActivation";
import Login from "@/pages/auth/Login";
import RequestResetPassword from "@/pages/auth/RequestResetPassword";
import RequestResetPasswordConfirm from "@/pages/auth/RequestResetPasswordConfirm";
import ResetPassword from "@/pages/auth/ResetPassword";
import ResetPasswordConfirm from "@/pages/auth/ResetPasswordConfirm";
import AccountActivationSuccess from "@/pages/auth/AccountActivationSuccess";
import { TRoutesList } from "@/models";

export const authRoutes = {
  signup: {
    path: "/auth/user/signup",
    title: "Inscription | Clone Twitter",
  },
  signupConfirm: {
    path: "/auth/user/signup/confirm/",
    title: "Inscription Envoyé | Clone Twitter",
  },
  accountActivation: {
    path: "/auth/user/account/activation/:uidb64/:token",
    title: "Activation du compte en cours | Clone Twitter",
  },
  accountActivationSuccess: {
    path: "/auth/user/account/activation/success",
    title: "Activation réussie du compte | Clone Twitter",
  },
  login: {
    path: "/auth/user/login",
    title: "Connexion | Clone Twitter",
  },
  requestResetPassword: {
    path: "/auth/user/request/reset/password",
    title: "Demande de réinitialisation du mot de passe | Clone Twitter",
  },
  requestResetPasswordConfirm: {
    path: "/auth/user/request/reset/password/confirm",
    title: "Réinitialisation du mot de passe envoyée | Clone Twitter",
  },
  resetPassword: {
    path: "/auth/user/reset/password/:uid/:token",
    title: "Réinitialisation du mot de passe | Clone Twitter",
  },
  resetPasswordConfirm: {
    path: "/auth/user/reset/password/confirm",
    title: "Confirmation de Réinitialisation du mot de passe | Clone Twitter",
  },
};

export const authRoutesList: TRoutesList[] = [
  { path: authRoutes.signup.path, element: <SignUp /> },
  { path: authRoutes.signupConfirm.path, element: <SignUpConfirm /> },
  { path: authRoutes.accountActivation.path, element: <AccountActivation /> },
  { path: authRoutes.accountActivationSuccess.path, element: <AccountActivationSuccess /> },
  { path: authRoutes.login.path, element: <Login /> },
  { path: authRoutes.requestResetPassword.path, element: <RequestResetPassword /> },
  { path: authRoutes.requestResetPasswordConfirm.path, element: <RequestResetPasswordConfirm /> },
  { path: authRoutes.resetPassword.path, element: <ResetPassword /> },
  { path: authRoutes.resetPasswordConfirm.path, element: <ResetPasswordConfirm /> },
];
