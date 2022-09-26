import React from "react";

import Navbar from "@/components/navbar/Navbar";
import AddNewTweetProvider from "@/context/AddNewTweetProvider";
import ModalAddNewTweet from "@/components/homePrivate/ModalAddNewTweet";

const Layout = (props: React.PropsWithChildren<any>) => {
  React.useEffect(() => {
    window.addEventListener("scroll", () => {
      const search: HTMLElement | null = document.querySelector(".search-container");
      search?.classList.toggle("sticky", window.scrollY > 0);
    });
  });
  return (
    <div className="layout">
      <AddNewTweetProvider>
        <ModalAddNewTweet />
        <header className="header">
          <div className="nav-container">
            <Navbar />
          </div>
        </header>
        {props.children}
      </AddNewTweetProvider>
    </div>
  );
};

export default Layout;
