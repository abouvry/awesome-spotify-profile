import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { getAccessToken } from "./utils/auth";

export default function App() {
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
  const query = new URLSearchParams(window.location.search);
  const code = query.get("code");

  if (code && !localStorage.getItem("spotify_token")) {
    getAccessToken(code).then((token) => {
      setToken(token);
      navigate("/profile");
    });
  } else {
    const savedToken = localStorage.getItem("spotify_token");
    if (savedToken) setToken(savedToken);
  }
}, [navigate]);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("spotify_token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 p-6">
      <Routes>
        <Route path="/" element={<Login token={token} />} />
        <Route
          path="/profile"
          element={<Profile token={token} onLogout={logout} />}
        />
      </Routes>
    </div>
  );
}
