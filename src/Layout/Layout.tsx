import React from "react";

import Navbar from "@/components/navbar/Navbar";
import TweetProvider from "@/context/TweetProvider";
import CommentProvider from "@/context/CommentProvider";
import ModalAddNewTweet from "@/components/homePrivate/ModalAddNewTweet";
import ModalAddComment from "@/components/PostDetails/ModalAddComment";

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
    <div className="layout">
      <TweetProvider>
        <CommentProvider>
          <header className="header">
            <div className="nav-container">
              <Navbar />
            </div>
          </header>
          {props.children}
          <ModalAddComment />
        </CommentProvider>
        <ModalAddNewTweet />
      </TweetProvider>
    </div>
  );
};

export default Layout;
