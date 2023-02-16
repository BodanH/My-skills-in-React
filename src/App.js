import React, { useRef, useState, localeCompare, useMemo, useEffect } from "react";
import "./styles/App.css"

import { BrowserRouter as Router, Route, Routes, Switch, Redirect } from "react-router-dom";
import Navbar from "./components/UI/NavBar/Navbar";
import AppRouter from "./components/UI/AppRourer";
import { AuthContext } from "./context/Context";
import Login from "./pages/Login";

function App() {

  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("auth")) {
      setIsAuth(true);
    }
    setLoading(false)
  },[])

  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth: setIsAuth,
      isLoading
    }}>
      <Router>
        <Navbar />
        <AppRouter/>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
