import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../../pages/Home";
import NotFound from "../../pages/NotFound";

const index = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route name="home" path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default index;
