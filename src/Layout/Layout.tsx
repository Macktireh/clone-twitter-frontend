import * as React from "react";
import InputSearch from "../components/Input/InputSearch";
import Navbar from "../components/Navbar";

const Layout = (props: React.PropsWithChildren<any>) => {
  return (
    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">{props.children}</div>
      <div className="aside">
        <InputSearch />
        <div className="trends"></div>
        <div className="follow"></div>
        <div className="follow2"></div>
      </div>
    </div>
  );
};

export default Layout;
