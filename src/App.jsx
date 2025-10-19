import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login";
import ProfilePage from "./pages/Profile";

function App() {

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 p-6">
      <Routes>
        <Route path="/" element={<LoginPage token={token} />} />
        <Route
          path="/profile"
          element={<ProfilePage token={token} onLogout={logout} />}
        />
      </Routes>
    </div>
  );
}

export default App;
