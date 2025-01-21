import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Cuisine() {
  const location = useLocation();
  const navigate = useNavigate();

  const [cuisine, setCuisine] = useState("");
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const cuisineData = location.state?.cuisine;
    if (cuisineData) {
      setCuisine(cuisineData.toLowerCase());
    }
  }, [location.state]);

  useEffect(() => {
    const fetchMeals = async () => {
      if (!cuisine) return;
      try {
        const response = await axios.get("/api/meals", {
          params: { cuisine },
        });
        console.log("Fetched Meals:", response.data.meals);
        setMeals(response.data.meals || []);
      } catch (err) {
        console.error("Error fetching meals:", err.message);
        setError("Failed to fetch meals. Try again later.");
      }
    };

    fetchMeals();
  }, [cuisine]);

  const fetchRecipe = async (id) => {
    try {
      const response = await axios.post("/api/recipe", {
        id,
      });

      const { youtubeLink } = response.data;
      if (youtubeLink) {
        window.open(youtubeLink, "_blank");
      } else {
        setError("Recipe not found.");
      }
    } catch (err) {
      console.error("Error fetching recipe:", err.message);
      setError("Failed to fetch recipe. Try again later.");
    }
  };

  console.log("Cuisine:", cuisine);
  console.log("Meas:", meals);

  const userSearch = async () => {
    navigate("/");
  };

  return (
    <div className="cuisine">
      <div className="music-navbar">
        <h1 id="music-header">FlavorBeat</h1>
        <div className="navbar">
          <p onClick={userSearch}>Search</p>
          <p onClick={userSearch}>Home</p>
        </div>
      </div>
      <h3 id="cuisine-name">{cuisine.toUpperCase()} CUISINE</h3>
      <div className="cuisine-search-results">
        {meals.map((meal, index) => (
          <div
            onClick={() => fetchRecipe(meal.idMeal)}
            className="cuisine-disp-block"
            key={index}
          >
            <img src={meal.strMealThumb} alt={meal.strMeal}></img>
            <div className="cuisine-dish-details">
              <h3
                style={{
                  marginTop: "0px",
                  marginBottom: " 0px",
                }}
              >
                {meal.strMeal}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Cuisine;
