import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/home/Home";
import SignUp from "../pages/account/SignUp";
import SignIn from "../pages/account/SignIn";
import NotFound from "../pages/NotFound";

const index = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route name="home" path="/" element={<Home />} />
        <Route name="signup" path="/account/signup" element={<SignUp />} />
        <Route name="signin" path="/account/signin" element={<SignIn />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default index;
