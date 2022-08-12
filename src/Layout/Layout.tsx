import * as React from "react";

import InputSearch from "@/components/Input/InputSearch";
import Navbar from "@/components/Navbar";

const Layout = (props: React.PropsWithChildren<any>) => {
  React.useEffect(() => {
    window.addEventListener("scroll", () => {
      const search: HTMLElement | null = document.querySelector(".search-container");
      search?.classList.toggle("sticky", window.scrollY > 0);
    });
  });
  return (
    <div className="layout">
      <div className="navbar">
        <div className="container">
          <Navbar />
        </div>
      </div>
      <div className="main">
        {props.children}
        <div className="trends"></div>
        <div className="footer"></div>
        <div className="trends"></div>
        <div className="footer"></div>
        <div className="footer"></div>
        <div className="footer"></div>
        <div className="footer"></div>
        <div className="footer"></div>
        <div className="footer"></div>
        <div className="footer"></div>
      </div>
      <div className="aside">
        <div className="search-container">
          <InputSearch />
        </div>
        <div className="trends"></div>
        <div className="follow">
          <div className="footer"></div>
          <div className="footer"></div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
