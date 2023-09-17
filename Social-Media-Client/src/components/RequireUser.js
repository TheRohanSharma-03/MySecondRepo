import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getItem, KEY_ACCESS_TOKEN } from "../utils/localStorageManager";
// import Login from "../pages/login/Login";

function RequireUser() {
  const user = getItem(KEY_ACCESS_TOKEN);
  // console.log("user", user);

  return user ? <Outlet /> : <Navigate to="/login" />;
}

export default RequireUser;
