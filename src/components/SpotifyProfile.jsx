import React, { useEffect, useState } from "react";
import axios from "axios";

export default function SpotifyProfile({ token }) {
  const [profile, setProfile] = useState(null);
  const [topTracks, setTopTracks] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    setError(null);

    const headers = { Authorization: `Bearer ${token}` };

    const getProfile = axios.get("https://api.spotify.com/v1/me", { headers });
    const getTopTracks = axios.get(
      "https://api.spotify.com/v1/me/top/tracks?limit=12&time_range=short_term",
      { headers }
    );
    const getTopArtists = axios.get(
      "https://api.spotify.com/v1/me/top/artists?limit=12&time_range=short_term",
      { headers }
    );

    Promise.all([getProfile, getTopTracks, getTopArtists])
      .then(([resProfile, resTracks, resArtists]) => {
        setProfile(resProfile.data);
        setTopTracks(resTracks.data.items);
        setTopArtists(resArtists.data.items);
      })
      .catch((err) => {
        console.error(err);
        setError(
          "Impossible de récupérer les données Spotify. Le token peut avoir expiré."
        );
        if (err.response && err.response.status === 401) {
          window.localStorage.removeItem("spotify_token");
        }
      })
      .finally(() => setLoading(false));
  }, [token]);

  if (loading)
    return (
      <div className="rounded-lg p-6 bg-white shadow text-center">
        Chargement…
      </div>
    );

  if (error)
    return (
      <div className="rounded-lg p-6 bg-white shadow text-red-600">{error}</div>
    );

  if (!profile) return null;

  return (
    <div className="space-y-6">
      {/* Profil utilisateur */}
      <section className="rounded-lg p-6 bg-white shadow flex items-center gap-6">
        <img
          src={profile.images?.[0]?.url}
          alt="avatar"
          className="w-28 h-28 rounded-full object-cover"
        />
        <div>
          <h2 className="text-2xl font-semibold">{profile.display_name}</h2>
          <p className="text-sm text-neutral-600">{profile.email}</p>
          <p className="mt-2 text-sm">Pays : {profile.country}</p>
        </div>
      </section>

      {/* Titres et artistes */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Titres */}
        <div className="rounded-lg p-4 bg-white shadow">
          <h3 className="font-semibold mb-3">Top Titres (dernier mois)</h3>
          <ol className="space-y-3">
            {topTracks.map((t) => (
              <li key={t.id} className="flex items-center gap-3">
                <img
                  src={t.album.images?.[2]?.url}
                  alt="cover"
                  className="w-12 h-12 object-cover rounded"
                />
                <div>
                  <div className="font-medium">{t.name}</div>
                  <div className="text-sm text-neutral-600">
                    {t.artists.map((a) => a.name).join(", ")}
                  </div>
                </div>
                <div className="ml-auto text-sm text-neutral-500">
                  {Math.floor(t.duration_ms / 60000)}:
                  {String(
                    Math.floor((t.duration_ms % 60000) / 1000)
                  ).padStart(2, "0")}
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Artistes */}
        <div className="rounded-lg p-4 bg-white shadow">
          <h3 className="font-semibold mb-3">
            Top Artistes (dernier mois)
          </h3>
          <ol className="space-y-3">
            {topArtists.map((artist) => (
              <li key={artist.id} className="flex items-center gap-3">
                <img
                  src={artist.images?.[2]?.url}
                  alt="artist"
                  className="w-12 h-12 object-cover rounded"
                />
                <div>
                  <div className="font-medium">{artist.name}</div>
                  <div className="text-sm text-neutral-600">
                    Genres : {artist.genres?.slice(0, 3).join(", ")}
                  </div>
                </div>
                <div className="ml-auto text-sm text-neutral-500">
                  Followers :{" "}
                  {Intl.NumberFormat().format(artist.followers.total)}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}