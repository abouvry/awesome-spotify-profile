import React from "react";
import { useNavigate } from "react-router-dom";
import SpotifyProfile from "../components/SpotifyProfile";

export default function Profile({ token, onLogout }) {
  const navigate = useNavigate();

  if (!token) {
    navigate("/");
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold">Mon Profil Spotify</h1>
        <button
          onClick={onLogout}
          className="px-3 py-2 rounded bg-white border hover:bg-neutral-100 transition"
        >
          Se déconnecter
        </button>
      </header>

      <SpotifyProfile token={token} />
    </div>
  );
}
