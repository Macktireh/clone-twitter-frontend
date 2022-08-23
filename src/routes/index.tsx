import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "@/pages/public/Home";
import NotFound from "@/pages/error/NotFound";
import { authRoutesList } from "@/routes/auth.routes";
import { tweetRoutesList } from "@/routes/tweet.routes";
import AuthProvider from "@/helper/AuthProvider";

const index: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AuthProvider isPublic={true}>
              <Home />
            </AuthProvider>
          }
        />
        {authRoutesList.map(({ path, element }, key) => (
          <Route path={path} element={<AuthProvider isPublic={true}>{element}</AuthProvider>} key={key} />
        ))}
        {tweetRoutesList.map(({ path, element }, key) => (
          <Route path={path} element={<AuthProvider isPublic={false}>{element}</AuthProvider>} key={key} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default index;
