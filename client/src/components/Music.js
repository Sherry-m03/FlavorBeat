import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Music() {
  const navigate = useNavigate();

  const [tracks, setTracks] = useState([]);
  const [error, setError] = useState("");
  const [mood, setMood] = useState("");

  const location = useLocation();
  const { tempMood, cuisines } = location.state || {};

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await axios.get("/api/tracks", {
          params: { mood },
        });
        setTracks(response.data);
      } catch (err) {
        console.error("Error fetching tracks:", err.message);
        setError("Failed to fetch tracks. Please try again later.");
      }
    };

    fetchTracks();
  }, [mood]);

  const fetchFood = async (cuisineName) => {
    navigate("/cuisine-dishes", {
      state: { cuisine: cuisineName },
    });
  };

  const userSearch = async () => {
    navigate("/");
  };
  const PlaySpotify = async (spot) => {
    if (spot) {
      window.open(spot, "_blank");
    } else {
      setError("Song not found.");
    }
  };

  return (
    <div className="music">
      <div className="music-navbar">
        <h1 id="music-header">FlavorBeat</h1>
        <div className="navbar">
          <p onClick={userSearch}>Search</p>
          <p onClick={userSearch}>Home</p>
        </div>
      </div>
      <div className="search-results">
        <div className="music-search-results">
          <h2 className="music-search-results-header">Music you might like:</h2>
          {tracks.map((track, index) => (
            <div
              className="music-disp-block"
              key={index}
              onClick={() => PlaySpotify(track.spotURL)}
            >
              <img src={track.image} alt={track.name}></img>
              <div className="track-details">
                <h3
                  style={{
                    marginTop: "0px",
                    marginBottom: " 0px",
                  }}
                >
                  {track.name}
                </h3>
                <p
                  style={{
                    marginTop: "0px",
                    marginBottom: " 0px",
                  }}
                >
                  {track.artist}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="food-search-results">
          <h2 className="music-search-results-header">Food you might like:</h2>
          <div className="foodrow">
            <div className="foodblock-container">
              <img
                src={cuisines[0].image}
                alt={cuisines[0].name}
                className="foodblock"
              />
              <div
                onClick={() => {
                  fetchFood(cuisines[0].name);
                }}
                className="foodblock-overlay"
              >
                <div className="foodblock-overlay-text">{cuisines[0].name}</div>
              </div>
            </div>
            <div className="foodblock-container">
              <img
                src={cuisines[1].image}
                alt={cuisines[1].name}
                className="foodblock"
              />
              <div
                onClick={() => fetchFood(cuisines[1].name)}
                className="foodblock-overlay"
              >
                <div className="foodblock-overlay-text">{cuisines[1].name}</div>
              </div>
            </div>
          </div>
          <div className="foodrow">
            <div className="foodblock-container">
              <img
                src={cuisines[2].image}
                alt={cuisines[2].name}
                className="foodblock"
              />
              <div
                onClick={() => fetchFood(cuisines[2].name)}
                className="foodblock-overlay"
              >
                <div className="foodblock-overlay-text">{cuisines[2].name}</div>
              </div>
            </div>
            <div className="foodblock-container">
              <img
                src={cuisines[3].image}
                alt={cuisines[3].name}
                className="foodblock"
              />
              <div
                onClick={() => fetchFood(cuisines[3].name)}
                className="foodblock-overlay"
              >
                <div className="foodblock-overlay-text">{cuisines[3].name}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Music;
