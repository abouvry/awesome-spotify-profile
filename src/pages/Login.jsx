import React from "react";
import { useNavigate } from "react-router-dom";
import { redirectToSpotifyAuth } from "../utils/auth";

export default function Login({ token }) {
  const navigate = useNavigate();

  if (token) {
    navigate("/profile");
  }

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center">
      <h1 className="text-4xl font-bold mb-6">
        Bienvenue sur Mon Profil Spotify
      </h1>
      <p className="text-neutral-600 mb-8 max-w-md">
        Connecte-toi à ton compte Spotify pour découvrir ton profil, tes
        artistes et tes titres préférés.
      </p>
      <button
        onClick={redirectToSpotifyAuth}
        className="bg-green-500 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-green-600 transition"
      >
        Se connecter avec Spotify
      </button>
    </div>
  );
}
