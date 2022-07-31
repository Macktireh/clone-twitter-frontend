import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/home/Home";
import authRoutes from "./auth.route";
import NotFound from "../pages/error/NotFound";
import Layout from "../Layout/Layout";

const index: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          {authRoutes.map(({ path, element }, key) => (
            <Route path={path} element={element} key={key} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default index;
