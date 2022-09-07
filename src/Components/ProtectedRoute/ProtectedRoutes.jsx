import React from "react";
import Login from "./../Login/Login";
import { Navigate } from "react-router-dom";

export default function ProtectedRoutes(props) {
  if (localStorage.getItem("token") != null) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}
