import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/home/Home";
import authRoutesList from "./auth.routes";
import NotFound from "../pages/error/NotFound";
import Layout from "../Layout/Layout";
import { tweetRoutesList } from "./tweet.routes";

const index: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          {authRoutesList.map(({ path, element }, key) => (
            <Route path={path} element={element} key={key} />
          ))}
          {tweetRoutesList.map(({ path, element }, key) => (
            <Route path={path} element={element} key={key} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default index;
