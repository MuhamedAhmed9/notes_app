import "./App.css";
import NavBar from "./Components/NavBar/NavBar";
import Home from "./Components/Home/Home";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./Components/NotFound/NotFound";
import ProtectedRoutes from "./Components/ProtectedRoute/ProtectedRoutes";
import jwtDecode from "jwt-decode";
import { useState, useEffect } from "react";

function App() {
  const [userData, setUserData] = useState(null);

  function saveUserData() {
    let encodedToken = localStorage.getItem("token");
    if (encodedToken !== null) {
      let decodedToken = jwtDecode(encodedToken);
      setUserData(decodedToken);
    }
  }

  useEffect(() => {
    saveUserData();
  }, []);

  function logout() {
    setUserData(null);
    localStorage.removeItem("token");
  }

  return (
    <>
      <NavBar userData={userData} logout={logout} />
      <Routes>
        <Route
          path="/home"
          element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          }
        ></Route>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/register" element={<Register />}></Route>
        <Route
          path="/login"
          element={<Login saveUserData={saveUserData} />}
        ></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
