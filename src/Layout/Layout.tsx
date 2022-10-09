import React from "react";

import Navbar from "@/components/navbar/Navbar";
// import TweetProvider from "@/context/TweetProvider";
// import CommentProvider from "@/context/CommentProvider";
import ModalAddNewTweet from "@/components/homePrivate/ModalAddNewTweet1";
import ModalAddComment from "@/components/PostDetails/ModalAddComment1";
import TweetCommentProvider from "@/context/TweetCommentProvider";

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
      <TweetCommentProvider>
        {/* <CommentProvider> */}
          <header className="header">
            <div className="nav-container">
              <Navbar />
            </div>
          </header>
          {props.children}
          <ModalAddComment />
        {/* </CommentProvider> */}
        <ModalAddNewTweet />
      </TweetCommentProvider>
    </div>
  );
};

export default Layout;
