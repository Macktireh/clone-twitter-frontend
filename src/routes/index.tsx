import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePublic from "@/pages/public/HomePublic";
import Error404 from "@/pages/error/Error404";
import { authRoutesList } from "@/routes/auth.routes";
import { privateRoutesList } from "@/routes/private.routes";
import AuthProvider from "@/helper/AuthProvider";

const index: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AuthProvider isPublic={true}>
              <HomePublic />
            </AuthProvider>
          }
        />
        {authRoutesList.map(({ path, element }, key) => (
          <Route path={path} element={<AuthProvider isPublic={true}>{element}</AuthProvider>} key={key} />
        ))}
        {privateRoutesList.map(({ path, element }, key) => (
          <Route path={path} element={<AuthProvider isPublic={false}>{element}</AuthProvider>} key={key} />
        ))}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default index;
