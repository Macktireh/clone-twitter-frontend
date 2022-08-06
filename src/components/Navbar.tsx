import * as React from "react";
import { Link } from "react-router-dom";
import { tweetRoutes } from "../routes/tweet.routes";
import Button from "./Buttons/buttonSubmit";

const Navbar: React.FC = () => {
  return (
    <nav className="nav">
      <div className="nav-content">
        <div className="logo">
          <Link to={tweetRoutes.home.path} className="nav__items__item">
            <img src="" alt="logo" />
            Logo
          </Link>
        </div>
        <div className="nav__items">
          <Link to="/" className="nav__items__item">
            <img src="" alt="home" />
            <span>Home</span>
          </Link>
          <Link to="/" className="nav__items__item">
            <img src="" alt="" />
            <span>Explore</span>
          </Link>
          <Link to="/" className="nav__items__item">
            <img src="" alt="" />
            <span>Notifications</span>
          </Link>
          <Link to="/" className="nav__items__item">
            <img src="" alt="" />
            <span></span>
          </Link>
          <Link to="/" className="nav__items__item">
            <img src="" alt="" />
            <span></span>
          </Link>
          <Link to="/" className="nav__items__item">
            <img src="" alt="" />
            <span></span>
          </Link>
          <Link to="/" className="nav__items__item">
            <img src="" alt="" />
            <span></span>
          </Link>
          <Link to="/" className="nav__items__item">
            <img src="" alt="" />
            <span></span>
          </Link>
        </div>
        <div className="add-tweet">
          <Button nameClass={"btn-add-tweet"} text={"Tweet"} />
        </div>
      </div>
      <div className="nav-user">
        <Link to="/" className="nav__items__item">
          <img src="" alt="" />
          <span></span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
