import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.static(path.join(__dirname, "build")));
app.use(express.json());

let spotifyAccessToken = null;
let tokenExpirationTime = null;

const getSpotifyAccessToken = async () => {
  const spotifyClientId = process.env.SPOTIFY_CLIENT_ID;
  const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (spotifyAccessToken && Date.now() < tokenExpirationTime) {
    return spotifyAccessToken;
  }

  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    "grant_type=client_credentials",
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${spotifyClientId}:${spotifyClientSecret}`
        ).toString("base64")}`,
      },
    }
  );

  spotifyAccessToken = response.data.access_token;
  tokenExpirationTime = Date.now() + response.data.expires_in * 1000;
  return spotifyAccessToken;
};

app.get("/api/tracks", async (req, res) => {
  const mood = req.query.mood;
  const lastFmApiKey = process.env.LASTFM_API_KEY;

  try {
    const lastFmResponse = await axios.get(
      "http://ws.audioscrobbler.com/2.0/",
      {
        params: {
          method: "tag.gettoptracks",
          tag: mood,
          api_key: lastFmApiKey,
          format: "json",
        },
      }
    );

    const trackData = lastFmResponse.data.tracks.track;
    if (!trackData || trackData.length === 0) {
      return res.status(404).json({ error: "No tracks found for this mood." });
    }

    const shuffledTracks = trackData
      .sort(() => Math.random() - 0.5)
      .slice(0, 7);

    const spotifyAccessToken = await getSpotifyAccessToken();

    const enrichedTracks = await Promise.all(
      shuffledTracks.map(async (track) => {
        try {
          const spotifyResponse = await axios.get(
            "https://api.spotify.com/v1/search",
            {
              headers: {
                Authorization: `Bearer ${spotifyAccessToken}`,
              },
              params: {
                q: `${track.name} ${track.artist.name}`,
                type: "track",
                limit: 1,
              },
            }
          );

          const spotifyTrack = spotifyResponse.data.tracks.items[0] || null;
          return {
            name: track.name,
            artist: track.artist.name,
            image: spotifyTrack?.album?.images[0]?.url || null,
            spotURL: spotifyTrack.external_urls.spotify,
          };
        } catch (err) {
          console.error(
            `Error fetching Spotify data for ${track.name}:`,
            err.message
          );
          return {
            name: track.name,
            artist: track.artist.name,
            image: null,
          };
        }
      })
    );

    res.json(enrichedTracks);
  } catch (err) {
    console.error("Error fetching tracks:", err.message);
    res
      .status(500)
      .json({ error: "Failed to fetch tracks. Please try again." });
  }
});

app.get("/api/meals", async (req, res) => {
  const cuisine = req.query.cuisine;

  if (!cuisine) {
    return res.status(400).json({ error: "Cuisine is required." });
  }

  try {
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${cuisine}`
    );

    const meals = response.data.meals || [];
    res.json({ meals });
  } catch (err) {
    console.error("Error fetching meals from TheMealDB:", err.message);
    res.status(500).json({ error: "Failed to fetch meals. Please try again." });
  }
});

app.post("/api/recipe", async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Recipe ID is required" });
  }

  try {
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );

    const meal = response.data.meals[0];
    if (meal) {
      return res.json({ youtubeLink: meal.strYoutube });
    } else {
      return res.status(404).json({ error: "Recipe not found" });
    }
  } catch (error) {
    console.error("Error fetching recipe:", error.message);
    res.status(500).json({ error: "Failed to fetch recipe" });
  }
});

app.get("/ping", (req, res) => {
  res.status(200).send("Pong");
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
