import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";

const authRoutes = [
  { path: "/auth/signup", element: <SignUp /> },
  { path: "/auth/login", element: <Login /> },
];

export default authRoutes;
