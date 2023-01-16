import React from "react";

import Navbar from "@/components/navbar/Navbar";
import NavbarProvider from "@/context/NavbarProvider";
import ModalAddNewTweet from "@/components/homePrivate/ModalAddNewTweet";
import TweetCommentProvider from "@/context/TweetCommentProvider";
import ModalAddComment from "@/components/postDetails/ModalAddComment";
import NavbarMobile from "@/components/navbar/NavbarMobile";
import NavbarMobileLeft from "@/components/navbar/NavbarMobileLeft";
import NotifyProvider from "@/context/NotifyProvider";

const Layout = (props: React.PropsWithChildren<any>) => {
  const flag = React.useRef(false);
  React.useEffect(() => {
    window.addEventListener("scroll", () => {
      const search: HTMLElement | null = document.querySelector(".search-container");
      search?.classList.toggle("sticky", window.scrollY > 0);
    });
    if (!flag.current) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      flag.current = true;
    }
  });
  return (
    <>
      <NavbarProvider>
        <div className="layout">
          <NotifyProvider>
            <TweetCommentProvider>
              <header className="header">
                <div className="nav-container">
                  <Navbar />
                </div>
              </header>
              {props.children}
              <ModalAddComment />
              <ModalAddNewTweet />
            </TweetCommentProvider>
          </NotifyProvider>
        </div>
        <NavbarMobile />
        <NavbarMobileLeft />
      </NavbarProvider>
    </>
  );
};

export default Layout;
