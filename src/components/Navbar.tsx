import * as React from "react";
import { NavLink } from "react-router-dom";
import { tweetRoutes } from "../routes/tweet.routes";

const Navbar: React.FC = () => {
  const [active, setActive] = React.useState("");

  const handleActive = (active: string): string => {
    setActive(active);
    return "nav-link";
  };

  return (
    <nav className="nav">
      <div className="nav-content">
        <div className="nav-logo">
          <NavLink to={tweetRoutes.home.path}>
            <img src="/static/svg/twitter.svg" alt="logo" />
          </NavLink>
        </div>
        <div className="nav__list">
          <NavLink
            to={tweetRoutes.home.path}
            className={(nav) => (nav.isActive ? handleActive("home") : "nav-link")}
          >
            {active === "home" ? (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <g>
                  <path
                    fill="#f1f1f1"
                    d="M22.58 7.35L12.475 1.897c-.297-.16-.654-.16-.95 0L1.425 7.35c-.486.264-.667.87-.405 1.356.18.335.525.525.88.525.16 0 .324-.038.475-.12l.734-.396 1.59 11.25c.216 1.214 1.31 2.062 2.66 2.062h9.282c1.35 0 2.444-.848 2.662-2.088l1.588-11.225.737.398c.485.263 1.092.082 1.354-.404.263-.486.08-1.093-.404-1.355zM12 15.435c-1.795 0-3.25-1.455-3.25-3.25s1.455-3.25 3.25-3.25 3.25 1.455 3.25 3.25-1.455 3.25-3.25 3.25z"
                  ></path>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <g>
                  <path
                    fill="#f1f1f1"
                    d="M22.46 7.57L12.357 2.115c-.223-.12-.49-.12-.713 0L1.543 7.57c-.364.197-.5.652-.303 1.017.135.25.394.393.66.393.12 0 .243-.03.356-.09l.815-.44L4.7 19.963c.214 1.215 1.308 2.062 2.658 2.062h9.282c1.352 0 2.445-.848 2.663-2.087l1.626-11.49.818.442c.364.193.82.06 1.017-.304.196-.363.06-.818-.304-1.016zm-4.638 12.133c-.107.606-.703.822-1.18.822H7.36c-.48 0-1.075-.216-1.178-.798L4.48 7.69 12 3.628l7.522 4.06-1.7 12.015z"
                  ></path>
                  <path
                    fill="#f1f1f1"
                    d="M8.22 12.184c0 2.084 1.695 3.78 3.78 3.78s3.78-1.696 3.78-3.78-1.695-3.78-3.78-3.78-3.78 1.696-3.78 3.78zm6.06 0c0 1.258-1.022 2.28-2.28 2.28s-2.28-1.022-2.28-2.28 1.022-2.28 2.28-2.28 2.28 1.022 2.28 2.28z"
                  ></path>
                </g>
              </svg>
            )}
            <span className={active === "home" ? "active" : ""}>Home</span>
          </NavLink>
          <NavLink
            to="/"
            className={(nav) => (nav.isActive ? handleActive("explore") : "nav-link")}
          >
            {active === "explore" ? (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <g>
                  <path
                    fill="#f1f1f1"
                    d="M22.06 19.94l-3.73-3.73C19.38 14.737 20 12.942 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c1.943 0 3.738-.622 5.21-1.67l3.73 3.73c.292.294.676.44 1.06.44s.768-.146 1.06-.44c.586-.585.586-1.535 0-2.12zM11 17c-3.308 0-6-2.692-6-6s2.692-6 6-6 6 2.692 6 6-2.692 6-6 6z"
                  ></path>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <g>
                  <path
                    fill="#f1f1f1"
                    d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"
                  ></path>
                </g>
              </svg>
            )}
            <span className={active === "explore" ? "active" : ""}>Explore</span>
          </NavLink>
          <NavLink
            to="/"
            className={(nav) => (nav.isActive ? handleActive("notification") : "nav-link")}
          >
            {active === "notification" ? (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <g>
                  <path
                    fill="#f1f1f1"
                    d="M21.697 16.468c-.02-.016-2.14-1.64-2.103-6.03.02-2.533-.812-4.782-2.347-6.334-1.375-1.393-3.237-2.164-5.242-2.172h-.013c-2.004.008-3.866.78-5.242 2.172-1.534 1.553-2.367 3.802-2.346 6.333.037 4.332-2.02 5.967-2.102 6.03-.26.194-.366.53-.265.838s.39.515.713.515h4.494c.1 2.544 2.188 4.587 4.756 4.587s4.655-2.043 4.756-4.587h4.494c.324 0 .61-.208.712-.515s-.005-.644-.265-.837zM12 20.408c-1.466 0-2.657-1.147-2.756-2.588h5.512c-.1 1.44-1.29 2.587-2.756 2.587z"
                  ></path>
                </g>
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="r-vlxjld r-4qtqp9 r-yyyyoo r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-cnnz9e"
              >
                <g>
                  <path
                    fill="#f1f1f1"
                    d="M21.697 16.468c-.02-.016-2.14-1.64-2.103-6.03.02-2.532-.812-4.782-2.347-6.335C15.872 2.71 14.01 1.94 12.005 1.93h-.013c-2.004.01-3.866.78-5.242 2.174-1.534 1.553-2.368 3.802-2.346 6.334.037 4.33-2.02 5.967-2.102 6.03-.26.193-.366.53-.265.838.102.308.39.515.712.515h4.92c.102 2.31 1.997 4.16 4.33 4.16s4.226-1.85 4.327-4.16h4.922c.322 0 .61-.206.71-.514.103-.307-.003-.645-.263-.838zM12 20.478c-1.505 0-2.73-1.177-2.828-2.658h5.656c-.1 1.48-1.323 2.66-2.828 2.66zM4.38 16.32c.74-1.132 1.548-3.028 1.524-5.896-.018-2.16.644-3.982 1.913-5.267C8.91 4.05 10.397 3.437 12 3.43c1.603.008 3.087.62 4.18 1.728 1.27 1.285 1.933 3.106 1.915 5.267-.024 2.868.785 4.765 1.525 5.896H4.38z"
                  ></path>
                </g>
              </svg>
            )}
            <span className={active === "notification" ? "active" : ""}>Notifications</span>
          </NavLink>
          <NavLink
            to="/"
            className={(nav) => (nav.isActive ? handleActive("message") : "nav-link")}
          >
            {active === "message" ? (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <g>
                  <path
                    fill="#f1f1f1"
                    d="M11.55 12.082c.273.182.627.182.9 0L22 5.716V5.5c0-1.24-1.01-2.25-2.25-2.25H4.25C3.01 3.25 2 4.26 2 5.5v.197l9.55 6.385z"
                  ></path>
                  <path
                    fill="#f1f1f1"
                    d="M13.26 13.295c-.383.255-.82.382-1.26.382s-.877-.127-1.26-.383L2 7.452v11.67c0 1.24 1.01 2.25 2.25 2.25h15.5c1.24 0 2.25-1.01 2.25-2.25V7.47l-8.74 5.823z"
                  ></path>
                </g>
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="r-vlxjld r-4qtqp9 r-yyyyoo r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-cnnz9e"
              >
                <g>
                  <path
                    fill="#f1f1f1"
                    d="M19.25 3.018H4.75C3.233 3.018 2 4.252 2 5.77v12.495c0 1.518 1.233 2.753 2.75 2.753h14.5c1.517 0 2.75-1.235 2.75-2.753V5.77c0-1.518-1.233-2.752-2.75-2.752zm-14.5 1.5h14.5c.69 0 1.25.56 1.25 1.25v.714l-8.05 5.367c-.273.18-.626.182-.9-.002L3.5 6.482v-.714c0-.69.56-1.25 1.25-1.25zm14.5 14.998H4.75c-.69 0-1.25-.56-1.25-1.25V8.24l7.24 4.83c.383.256.822.384 1.26.384.44 0 .877-.128 1.26-.383l7.24-4.83v10.022c0 .69-.56 1.25-1.25 1.25z"
                  ></path>
                </g>
              </svg>
            )}
            <span className={active === "message" ? "active" : ""}>Messages</span>
          </NavLink>
          <NavLink
            to="/"
            className={(nav) => (nav.isActive ? handleActive("bookmark") : "nav-link")}
          >
            {active === "bookmark" ? (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <g>
                  <path
                    fill="#f1f1f1"
                    d="M19.9 23.5c-.2 0-.3 0-.4-.1L12 17.9l-7.5 5.4c-.2.2-.5.2-.8.1-.2-.1-.4-.4-.4-.7V5.6c0-1.2 1-2.2 2.2-2.2h12.8c1.2 0 2.2 1 2.2 2.2v17.1c0 .3-.2.5-.4.7 0 .1-.1.1-.2.1z"
                  ></path>
                </g>
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="r-vlxjld r-4qtqp9 r-yyyyoo r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-cnnz9e"
              >
                <g>
                  <path
                    fill="#f1f1f1"
                    d="M19.9 23.5c-.157 0-.312-.05-.442-.144L12 17.928l-7.458 5.43c-.228.164-.53.19-.782.06-.25-.127-.41-.385-.41-.667V5.6c0-1.24 1.01-2.25 2.25-2.25h12.798c1.24 0 2.25 1.01 2.25 2.25v17.15c0 .282-.158.54-.41.668-.106.055-.223.082-.34.082zM12 16.25c.155 0 .31.048.44.144l6.71 4.883V5.6c0-.412-.337-.75-.75-.75H5.6c-.413 0-.75.338-.75.75v15.677l6.71-4.883c.13-.096.285-.144.44-.144z"
                  ></path>
                </g>
              </svg>
            )}
            <span className={active === "bookmark" ? "active" : ""}>Bookmarks</span>
          </NavLink>
          <NavLink to="/" className={(nav) => (nav.isActive ? handleActive("list") : "nav-link")}>
            {active === "list" ? (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <g>
                  <path
                    fill="#f1f1f1"
                    d="M19.75 2H4.25C3.013 2 2 3.013 2 4.25v15.5C2 20.987 3.013 22 4.25 22h15.5c1.237 0 2.25-1.013 2.25-2.25V4.25C22 3.013 20.987 2 19.75 2zM11 16.75H7c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h4c.414 0 .75.336.75.75s-.336.75-.75.75zm6-4H7c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h10c.414 0 .75.336.75.75s-.336.75-.75.75zm0-4H7c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h10c.414 0 .75.336.75.75s-.336.75-.75.75z"
                  ></path>
                </g>
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="r-vlxjld r-4qtqp9 r-yyyyoo r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-cnnz9e"
              >
                <g>
                  <path
                    fill="#f1f1f1"
                    d="M19.75 22H4.25C3.01 22 2 20.99 2 19.75V4.25C2 3.01 3.01 2 4.25 2h15.5C20.99 2 22 3.01 22 4.25v15.5c0 1.24-1.01 2.25-2.25 2.25zM4.25 3.5c-.414 0-.75.337-.75.75v15.5c0 .413.336.75.75.75h15.5c.414 0 .75-.337.75-.75V4.25c0-.413-.336-.75-.75-.75H4.25z"
                  ></path>
                  <path
                    fill="#f1f1f1"
                    d="M17 8.64H7c-.414 0-.75-.337-.75-.75s.336-.75.75-.75h10c.414 0 .75.335.75.75s-.336.75-.75.75zm0 4.11H7c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h10c.414 0 .75.336.75.75s-.336.75-.75.75zm-5 4.11H7c-.414 0-.75-.335-.75-.75s.336-.75.75-.75h5c.414 0 .75.337.75.75s-.336.75-.75.75z"
                  ></path>
                </g>
              </svg>
            )}
            <span className={active === "list" ? "active" : ""}>Lists</span>
          </NavLink>
          <NavLink
            to="/"
            className={(nav) => (nav.isActive ? handleActive("profile") : "nav-link")}
          >
            {active === "profile" ? (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <g>
                  <path
                    fill="#f1f1f1"
                    d="M12.225 12.165c-1.356 0-2.872-.15-3.84-1.256-.814-.93-1.077-2.368-.805-4.392.38-2.826 2.116-4.513 4.646-4.513s4.267 1.687 4.646 4.513c.272 2.024.008 3.46-.806 4.392-.97 1.106-2.485 1.255-3.84 1.255zm5.849 9.85H6.376c-.663 0-1.25-.28-1.65-.786-.422-.534-.576-1.27-.41-1.968.834-3.53 4.086-5.997 7.908-5.997s7.074 2.466 7.91 5.997c.164.698.01 1.434-.412 1.967-.4.505-.985.785-1.648.785z"
                  ></path>
                </g>
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="r-vlxjld r-4qtqp9 r-yyyyoo r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-cnnz9e"
              >
                <g>
                  <path
                    fill="#f1f1f1"
                    d="M12 11.816c1.355 0 2.872-.15 3.84-1.256.814-.93 1.078-2.368.806-4.392-.38-2.825-2.117-4.512-4.646-4.512S7.734 3.343 7.354 6.17c-.272 2.022-.008 3.46.806 4.39.968 1.107 2.485 1.256 3.84 1.256zM8.84 6.368c.162-1.2.787-3.212 3.16-3.212s2.998 2.013 3.16 3.212c.207 1.55.057 2.627-.45 3.205-.455.52-1.266.743-2.71.743s-2.255-.223-2.71-.743c-.507-.578-.657-1.656-.45-3.205zm11.44 12.868c-.877-3.526-4.282-5.99-8.28-5.99s-7.403 2.464-8.28 5.99c-.172.692-.028 1.4.395 1.94.408.52 1.04.82 1.733.82h12.304c.693 0 1.325-.3 1.733-.82.424-.54.567-1.247.394-1.94zm-1.576 1.016c-.126.16-.316.246-.552.246H5.848c-.235 0-.426-.085-.552-.246-.137-.174-.18-.412-.12-.654.71-2.855 3.517-4.85 6.824-4.85s6.114 1.994 6.824 4.85c.06.242.017.48-.12.654z"
                  ></path>
                </g>
              </svg>
            )}
            <span className={active === "profile" ? "active" : ""}>Profile</span>
          </NavLink>
          <NavLink to="/" className="nav-link">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="r-vlxjld r-4qtqp9 r-yyyyoo r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-cnnz9e"
            >
              <g>
                <circle fill="#f1f1f1" cx="17" cy="12" r="1.5"></circle>
                <circle fill="#f1f1f1" cx="12" cy="12" r="1.5"></circle>
                <circle fill="#f1f1f1" cx="7" cy="12" r="1.5"></circle>
                <path
                  fill="#f1f1f1"
                  d="M12 22.75C6.072 22.75 1.25 17.928 1.25 12S6.072 1.25 12 1.25 22.75 6.072 22.75 12 17.928 22.75 12 22.75zm0-20C6.9 2.75 2.75 6.9 2.75 12S6.9 21.25 12 21.25s9.25-4.15 9.25-9.25S17.1 2.75 12 2.75z"
                ></path>
              </g>
            </svg>
            <span>More</span>
          </NavLink>
        </div>
        <div className="add-tweet">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <g>
              <path
                fill="#f1f1f1"
                d="M8.8 7.2H5.6V3.9c0-.4-.3-.8-.8-.8s-.7.4-.7.8v3.3H.8c-.4 0-.8.3-.8.8s.3.8.8.8h3.3v3.3c0 .4.3.8.8.8s.8-.3.8-.8V8.7H9c.4 0 .8-.3.8-.8s-.5-.7-1-.7zm15-4.9v-.1h-.1c-.1 0-9.2 1.2-14.4 11.7-3.8 7.6-3.6 9.9-3.3 9.9.3.1 3.4-6.5 6.7-9.2 5.2-1.1 6.6-3.6 6.6-3.6s-1.5.2-2.1.2c-.8 0-1.4-.2-1.7-.3 1.3-1.2 2.4-1.5 3.5-1.7.9-.2 1.8-.4 3-1.2 2.2-1.6 1.9-5.5 1.8-5.7z"
              ></path>
            </g>
          </svg>
          <span>Tweet</span>
        </div>
      </div>
      <div className="nav-user">
        <img src="/static/svg/user.svg" alt="" />

        <div className="username">
          <strong>Macktireh Abdi Soubaneh</strong>
          <p>@macktireh</p>
        </div>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <g>
            <circle fill="#f1f1f1" cx="17" cy="12" r="1.5"></circle>
            <circle fill="#f1f1f1" cx="12" cy="12" r="1.5"></circle>
            <circle fill="#f1f1f1" cx="7" cy="12" r="1.5"></circle>
          </g>
        </svg>
      </div>
    </nav>
  );
};

export default Navbar;
