import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/home/Home";
import authRoutes from "./AuthRoutes";
import NotFound from "../pages/Error/NotFound";

const index: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {authRoutes.map(({ path, element }, key) => (
          <Route path={path} element={element} key={key} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default index;
