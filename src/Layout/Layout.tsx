import * as React from "react";

import InputSearch from "@/components/Input/InputSearch";
import Navbar from "@/components/navbar/Navbar";

const Layout = (props: React.PropsWithChildren<any>) => {
  React.useEffect(() => {
    window.addEventListener("scroll", () => {
      const search: HTMLElement | null = document.querySelector(".search-container");
      search?.classList.toggle("sticky", window.scrollY > 0);
    });
  });
  return (
    <div className="layout">
      <header className="header">
        <div className="nav-container">
          <Navbar />
        </div>
      </header>
      <main className="main">{props.children}</main>
      <aside className="aside">
        <div className="search-container">
          <InputSearch />
        </div>
      </aside>
    </div>
  );
};

export default Layout;
