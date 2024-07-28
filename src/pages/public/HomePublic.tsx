import React from "react";
import { Link } from "react-router-dom";

import ButtonCustom from "@/widgets/ButtonCustom";
import { authRoutes } from "@/routes/auth.routes";
import { GoogleLoginButton } from "@/components/auth/GoogleLoginButton";

const HomePublic: React.FC = () => {
  React.useEffect(() => {
    document.title = "Clone Twitter";
  });

  return (
    <div className="home-page">
      <div className="container-content">
        <header>
          <img className="logo" src="/static/svg/twitter.svg" alt="logo Twitter" />
        </header>
        <div className="frame-title">
          <h1>It's happening now</h1>
          <h2>Join Twitter Clone today.</h2>
        </div>
        <div className="frame-btn-connexion">
          <div className="frame1">
            <GoogleLoginButton text={"Sign up with Google"} nameClass="btn-signup-ext btn-signup" />
            <ButtonCustom
              nameClass={"btn-signup-ext"}
              pic={"/static/svg/apple.svg"}
              text={"Sign up with Apple"}
            />
            <div className="sep">
              <hr />
              <span>or</span>
            </div>
            <div className="frame-signup-int">
              <Link to={authRoutes.signup.path}>
                <ButtonCustom nameClass={"btn-signup-int"} text={"Sign up with email and password"} />
              </Link>
              <p>
                By registering, you accept the
                <Link to="/">
                  <span> Terms of use </span>
                </Link>
                and <span> Privacy Policy</span>, including the
                <span> Use of Cookies</span>.
              </p>
            </div>
          </div>
          <div className="frame-signin">
            <h4>Already have an account?</h4>
            <Link to={authRoutes.login.path}>
              <ButtonCustom nameClass={"btn-signin"} text={"Sign in"} />
            </Link>
          </div>
        </div>
      </div>
      <div className="container-img">
        <img src="/static/svg/twitter.svg" alt="" />
      </div>
      <div className="container-footer">
        <span id="items-footer-home">About us</span>
        <span id="items-footer-home">Support Center</span>
        <span id="items-footer-home">Terms of use</span>
        <span id="items-footer-home">Privacy Policy</span>
        <span id="items-footer-home">Cookie policy</span>
        <span id="items-footer-home">Accessibilité</span>
        <span id="items-footer-home">Advertising information</span>
        <span id="items-footer-home">Blog</span>
        <span id="items-footer-home">Statut</span>
        <span id="items-footer-home">Careers</span>
        <span id="items-footer-home">Brand resources</span>
        <span id="items-footer-home">Advertising</span>
        <span id="items-footer-home">Marketing</span>
        <span id="items-footer-home">Twitter Clone for professionals</span>
        <span id="items-footer-home">Developers</span>
        <span id="items-footer-home">Directory</span>
        <span id="items-footer-home">Parameters</span>
        <span id="items-footer-home">© {new Date().getFullYear()} Twitter Clone, Inc.</span>
      </div>
    </div>
  );
};

export default HomePublic;
