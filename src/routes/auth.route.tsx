import SignUp from "../pages/auth/SignUp";
import Activate from "../pages/auth/ActivateAccount";
import Login from "../pages/auth/Login";
import ResetPasswordConfirm from "../pages/auth/ResetPasswordConfirm";
import RequestResetPasswordSendEmail from "../pages/auth/RequestResetPasswordSendEmail";
import SignUpSuccess from "../pages/auth/SingUpSuccess";

const authRoutes = [
  { path: "/auth/signup/", element: <SignUp /> },
  { path: "/auth/signup/success/", element: <SignUpSuccess /> },
  { path: "/auth/activate/:uidb64/:token/", element: <Activate /> },
  { path: "/auth/login", element: <Login /> },
  {
    path: "/auth/password/reset/send-email/",
    element: <RequestResetPasswordSendEmail />,
  },
  {
    path: "/auth/password/reset/confirm/:uid/:token/",
    element: <ResetPasswordConfirm />,
  },
];

export default authRoutes;
