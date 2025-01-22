import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const navigate = useNavigate();
  const [userMood, setUserMood] = useState("");
  const [time, setTime] = useState(new Date());

  const MoodCuisines = [
    {
      emotion:
        "Motivated, Pumped, Energetic, Focused, Driven, Ambitious, Determined, Refreshed, Exhilarated, Confident, Empowered",
      cuisines: [
        {
          name: "American",
          image:
            "https://cdn.pixabay.com/photo/2023/09/23/15/56/ai-generated-8271284_640.jpg",
        },
        {
          name: "Indian",
          image:
            "https://cdn.pixabay.com/photo/2021/02/28/09/38/food-6056720_1280.jpg",
        },
        {
          name: "Japanese",
          image:
            "https://cdn.pixabay.com/photo/2020/03/22/08/43/sushi-4956246_640.jpg",
        },
        {
          name: "Mexican",
          image:
            "https://cdn.pixabay.com/photo/2017/06/29/20/09/mexican-2456038_640.jpg",
        },
      ],
    },
    {
      emotion:
        "Happy, Groovy, Funky, Rhythmic, Vibrant, Jubilant, Excited, Elated, Exuberant, Hyper, Spirited, Uplifted",
      cuisines: [
        {
          name: "Mexican",
          image:
            "https://cdn.pixabay.com/photo/2017/06/29/20/09/mexican-2456038_640.jpg",
        },
        {
          name: "Canadian",
          image:
            "https://cdn.pixabay.com/photo/2022/07/15/18/12/bacon-poutine-7323673_1280.jpg",
        },
        {
          name: "American",
          image:
            "https://cdn.pixabay.com/photo/2023/09/23/15/56/ai-generated-8271284_640.jpg",
        },
        {
          name: "Italian",
          image:
            "https://cdn.pixabay.com/photo/2021/05/18/15/15/pasta-6263653_640.jpg",
        },
        {
          name: "Egyptian",
          image:
            "https://cdn.pixabay.com/photo/2017/07/14/23/25/kebab-2505239_640.jpg",
        },
      ],
    },
    {
      emotion:
        "Calm, Peaceful, Tranquil, Serene, Relaxed, Centered, Mindful, Harmonious, Quiet, Content, Reflective",
      cuisines: [
        {
          name: "Indian",
          image:
            "https://cdn.pixabay.com/photo/2021/02/28/09/38/food-6056720_1280.jpg",
        },
        {
          name: "Thai",
          image:
            "https://cdn.pixabay.com/photo/2021/02/09/03/53/thai-food-5997301_640.jpg",
        },
        {
          name: "Japanese",
          image:
            "https://cdn.pixabay.com/photo/2020/03/22/08/43/sushi-4956246_640.jpg",
        },
        {
          name: "Moroccan",
          image:
            "https://cdn.pixabay.com/photo/2021/11/01/15/52/spring-roll-6760871_1280.jpg",
        },
        {
          name: "Vietnamese",
          image:
            "https://cdn.pixabay.com/photo/2023/07/18/19/19/spring-rolls-8135469_640.jpg",
        },
      ],
    },
    {
      emotion:
        "Whimsical, Cozy, Inspired, Creative, Cheerful, Nostalgic, Warm, Curious, Delightful, Playful, Charming",
      cuisines: [
        {
          name: "French",
          image:
            "https://cdn.pixabay.com/photo/2017/07/28/14/29/macarons-2548827_640.jpg",
        },
        {
          name: "Italian",
          image:
            "https://cdn.pixabay.com/photo/2021/05/18/15/15/pasta-6263653_640.jpg",
        },
        {
          name: "American",
          image:
            "https://cdn.pixabay.com/photo/2023/09/23/15/56/ai-generated-8271284_640.jpg",
        },
        {
          name: "Chinese",
          image:
            "https://cdn.pixabay.com/photo/2020/05/29/04/17/chinese-5233490_640.jpg",
        },
        {
          name: "Greek",
          image:
            "https://cdn.pixabay.com/photo/2022/05/20/08/55/pasta-7209002_640.jpg",
        },
      ],
    },
    {
      emotion:
        "Focused, Engaged, Reflective, Productive, Alert, Intent, Immersed, Observant, Attentive, Concentrated, Thoughtful",
      cuisines: [
        {
          name: "Japanese",
          image:
            "https://cdn.pixabay.com/photo/2020/03/22/08/43/sushi-4956246_640.jpg",
        },
        {
          name: "Italian",
          image:
            "https://cdn.pixabay.com/photo/2021/05/18/15/15/pasta-6263653_640.jpg",
        },
        {
          name: "American",
          image:
            "https://cdn.pixabay.com/photo/2023/09/23/15/56/ai-generated-8271284_640.jpg",
        },
        {
          name: "Indian",
          image:
            "https://cdn.pixabay.com/photo/2021/02/28/09/38/food-6056720_1280.jpg",
        },
        {
          name: "Turkish",
          image:
            "https://cdn.pixabay.com/photo/2017/06/04/15/33/kebab-2373172_640.jpg",
        },
      ],
    },
    {
      emotion: "Sad, Melancholic, Gloomy, Downcast, Pensive, Nostalgic, Lonely",
      cuisines: [
        {
          name: "French",
          image:
            "https://cdn.pixabay.com/photo/2017/07/28/14/29/macarons-2548827_640.jpg",
        },
        {
          name: "Indian",
          image:
            "https://cdn.pixabay.com/photo/2021/02/28/09/38/food-6056720_1280.jpg",
        },
        {
          name: "Japanese",
          image:
            "https://cdn.pixabay.com/photo/2020/03/22/08/43/sushi-4956246_640.jpg",
        },
        {
          name: "American",
          image:
            "https://cdn.pixabay.com/photo/2023/09/23/15/56/ai-generated-8271284_640.jpg",
        },
        {
          name: "Russian",
          image:
            "https://cdn.pixabay.com/photo/2017/08/17/19/40/ukrainian-dill-potatoes-2652561_640.jpg",
        },
      ],
    },
    {
      emotion:
        "Angry, Frustrated, Annoyed, Enraged, Agitated, Irritated, Resentful",
      cuisines: [
        {
          name: "Mexican",
          image:
            "https://cdn.pixabay.com/photo/2017/06/29/20/09/mexican-2456038_640.jpg",
        },
        {
          name: "Turkish",
          image:
            "https://cdn.pixabay.com/photo/2017/06/04/15/33/kebab-2373172_640.jpg",
        },
        {
          name: "Chinese",
          image:
            "https://cdn.pixabay.com/photo/2020/05/29/04/17/chinese-5233490_640.jpg",
        },
        {
          name: "Jamaican",
          image:
            "https://cdn.pixabay.com/photo/2014/10/19/20/59/hamburger-494706_640.jpg",
        },
        {
          name: "Portuguese",
          image:
            "https://cdn.pixabay.com/photo/2023/05/31/11/15/fish-8031138_640.jpg",
        },
      ],
    },
    {
      emotion:
        "Confused, Perplexed, Puzzled, Baffled, Distracted, Dazed, Uncertain",
      cuisines: [
        {
          name: "Vietnamese",
          image:
            "https://cdn.pixabay.com/photo/2023/07/18/19/19/spring-rolls-8135469_640.jpg",
        },
        {
          name: "Dutch",
          image:
            "https://cdn.pixabay.com/photo/2019/09/16/17/09/zwiebelkuchen-4481524_640.jpg",
        },
        {
          name: "Canadian",
          image:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/poutine-973224_640.jpg",
        },
        {
          name: "British",
          image:
            "https://cdn.pixabay.com/photo/2024/03/20/12/26/fish-and-chips-8645438_1280.jpg",
        },
        {
          name: "Filipino",
          image:
            "https://cdn.pixabay.com/photo/2017/02/25/15/22/filipino-cuisine-2098007_640.jpg",
        },
      ],
    },
    {
      emotion: "Anxious, Worried, Nervous, Restless, Uneasy, Tense, Stressed",
      cuisines: [
        {
          name: "Thai",
          image:
            "https://cdn.pixabay.com/photo/2021/02/09/03/53/thai-food-5997301_640.jpg",
        },
        {
          name: "Italian",
          image:
            "https://cdn.pixabay.com/photo/2021/05/18/15/15/pasta-6263653_640.jpg",
        },
        {
          name: "Indian",
          image:
            "https://cdn.pixabay.com/photo/2021/02/28/09/38/food-6056720_1280.jpg",
        },
        {
          name: "Croatian",
          image:
            "https://cdn.pixabay.com/photo/2017/05/11/14/32/fish-fillet-2304335_640.jpg",
        },
        {
          name: "Spanish",
          image:
            "https://cdn.pixabay.com/photo/2020/03/21/11/30/paella-4953523_640.jpg",
        },
      ],
    },
    {
      emotion: "Lonely, Isolated, Withdrawn, Detached, Secluded, Homesick",
      cuisines: [
        {
          name: "American",
          image:
            "https://cdn.pixabay.com/photo/2023/09/23/15/56/ai-generated-8271284_640.jpg",
        },
        {
          name: "Greek",
          image:
            "https://cdn.pixabay.com/photo/2022/05/20/08/55/pasta-7209002_640.jpg",
        },
        {
          name: "Egyptian",
          image:
            "https://cdn.pixabay.com/photo/2017/12/09/07/10/koshari-3005625_640.jpg",
        },
        {
          name: "British",
          image:
            "https://cdn.pixabay.com/photo/2024/03/20/12/26/fish-and-chips-8645438_1280.jpg",
        },
        {
          name: "Filipino",
          image:
            "https://cdn.pixabay.com/photo/2017/02/25/15/22/filipino-cuisine-2098007_640.jpg",
        },
      ],
    },
  ];

  function getCuisineForMood(mood) {
    const matchedEmotion = MoodCuisines.find((entry) =>
      entry.emotion.toLowerCase().includes(mood.toLowerCase())
    );

    if (matchedEmotion) {
      const shuffledCuisines = [...matchedEmotion.cuisines].sort(
        () => Math.random() - 0.5
      );
      return shuffledCuisines.slice(0, 4);
    } else {
      return [
        {
          name: "Indian",
          image:
            "https://cdn.pixabay.com/photo/2021/02/28/09/38/food-6056720_1280.jpg",
        },
        {
          name: "Japanese",
          image:
            "https://cdn.pixabay.com/photo/2020/03/22/08/43/sushi-4956246_640.jpg",
        },
        {
          name: "Italian",
          image:
            "https://cdn.pixabay.com/photo/2021/05/18/15/15/pasta-6263653_640.jpg",
        },
        {
          name: "American",
          image:
            "https://cdn.pixabay.com/photo/2023/09/23/15/56/ai-generated-8271284_640.jpg",
        },
      ];
    }
  }

  const getEmotionBasedOnTime = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 4 && currentHour < 10) {
      setUserMood("Calm");
    } else if (currentHour >= 10 && currentHour < 16) {
      setUserMood("Motivated");
    } else if (currentHour >= 16 && currentHour < 22) {
      setUserMood("Groovy");
    } else {
      setUserMood("Sad");
    }
    fetchTracks(userMood);
  };

  const handleChange = (e) => {
    setUserMood(e.target.value);
  };

  const handleEnterPress = (event) => {
    if (event.key === "Enter") {
      fetchTracks(userMood);
    }
  };

  const fetchTracks = async (mood) => {
    const cuisines = getCuisineForMood(mood);
    navigate("/search-music", { state: { mood, cuisines } });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home">
      <div className="head">
        <h1 id="header">FlavorBeat</h1>
        <div className="searchbar">
          <img
            style={{ height: "20px", width: "20px", margin: "2%" }}
            src="https://uxwing.com/wp-content/themes/uxwing/download/user-interface/search-line-icon.svg"
            onClick={() => fetchTracks(userMood)}
            alt="search icon"
          ></img>
          <input
            placeholder="How are you feeling today?"
            onChange={handleChange}
            onKeyDown={handleEnterPress}
          ></input>
        </div>
        <button className="time-recom" onClick={getEmotionBasedOnTime}>
          Get Time Recommendations: {time.toLocaleTimeString()}
        </button>
      </div>
      <div className="display">
        <div className="disprow">
          <div
            className="dispblock"
            id="mood-happy"
            onClick={() => fetchTracks("happy")}
          >
            <div className="overlay">
              <span className="overlay-text">Happy</span>
            </div>
          </div>
          <div
            id="mood-sad"
            className="dispblock"
            onClick={() => fetchTracks("sad")}
          >
            <div className="overlay">
              <span className="overlay-text">Sad</span>
            </div>
          </div>
          <div
            id="mood-calm"
            className="dispblock"
            onClick={() => fetchTracks("calm")}
          >
            <div className="overlay">
              <span className="overlay-text">Calm</span>
            </div>
          </div>
          <div
            id="mood-energetic"
            className="dispblock"
            onClick={() => fetchTracks("energetic")}
          >
            <div className="overlay">
              <span className="overlay-text">Energetic</span>
            </div>
          </div>
          <div
            className="dispblock"
            id="mood-melancholic"
            onClick={() => fetchTracks("melancholic")}
          >
            <div className="overlay">
              <span className="overlay-text">Melancholic</span>
            </div>
          </div>
        </div>
        <div className="disprow">
          <div
            className="dispblock"
            id="mood-relaxing"
            onClick={() => fetchTracks("relaxing")}
          >
            <div className="overlay">
              <span className="overlay-text">Relaxing</span>
            </div>
          </div>
          <div
            className="dispblock"
            id="mood-upbeat"
            onClick={() => fetchTracks("upbeat")}
          >
            <div className="overlay">
              <span className="overlay-text">Upbeat</span>
            </div>
          </div>
          <div
            className="dispblock"
            id="mood-angry"
            onClick={() => fetchTracks("angry")}
          >
            <div className="overlay">
              <span className="overlay-text">Angry</span>
            </div>
          </div>
          <div
            className="dispblock"
            id="mood-romantic"
            onClick={() => fetchTracks("romantic")}
          >
            <div className="overlay">
              <span className="overlay-text">Romantic</span>
            </div>
          </div>
          <div
            className="dispblock"
            id="mood-cozy"
            onClick={() => fetchTracks("cozy")}
          >
            <div className="overlay">
              <span className="overlay-text">Cozy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
