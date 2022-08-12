import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "@/pages/home/Home";
import NotFound from "@/pages/error/NotFound";
import { authRoutesList } from "@/routes/auth.routes";
import { tweetRoutesList } from "@/routes/tweet.routes";

const index: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {authRoutesList.map(({ path, element }, key) => <Route path={path} element={element} key={key} />)}
        {tweetRoutesList.map(({ path, element }, key) => <Route path={path} element={element} key={key} />)}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default index;
