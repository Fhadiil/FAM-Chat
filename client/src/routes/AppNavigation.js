import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppLayout from "../components/layout/applayout";
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import Index from "../pages/main/Index";

const appLayoutRoutes = [
  { path: "/", element: <Index /> },
  { path: "/signIn", element: <SignIn /> },
  { path: "/register", element: <SignUp /> },
];

const AppNavigation = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/*"
          element={
            <AppLayout>
              <Routes>
                {appLayoutRoutes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    element={route.element}
                  />
                ))}
              </Routes>
            </AppLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppNavigation;
