# FlavorBeat

FlavorBeat is an innovative web application that connects your emotions to music and cuisine, creating a unique sensory experience tailored to your mood and time of day. With real-time emotion-based recommendations, you can explore curated playlists and delicious cuisines that resonate with how you feel.

---

## Features

1. **Mood-Based Music Recommendations**

   - Fetches top tracks from Last.fm.
   - Enriches tracks with album images and Spotify links.
   - Dynamic playlists tailored to various moods and emotions.

2. **Cuisine Suggestions**

   - Suggests cuisines based on moods.
   - Provides images and descriptions for cuisines.
   - Allows users to explore detailed recipes fetched from TheMealDB API.

3. **Time-Based Mood Settings**

   - Automatically determines mood based on the time of day.

4. **Interactive UI**
   - Hover effects and overlays for engaging visuals.
   - Real-time clock display.
   - Dynamic background changes.

---

## Technologies Used

### Frontend:

- **React.js**: For building a dynamic and responsive user interface.
- **CSS/SCSS**: For styling, animations, and hover effects.
- **Axios**: For making API calls to the backend.

### Backend:

- **Node.js**: As the runtime environment.
- **Express.js**: For building RESTful APIs.
- **APIs Used**:
  - Last.fm API: Fetching music tracks.
  - Spotify API: Enriching tracks with album images and links.
  - TheMealDB API: Fetching cuisines and recipes.

---

## Installation

### Prerequisites:

- Node.js installed on your machine.
- Spotify Developer account for API credentials.
- Last.fm API key.
- TheMealDB API key.

### Steps:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Sherry-m03/FlavorBeat.git
   cd FlavorBeat
   ```

2. **Install Dependencies**

   ```bash
   # For frontend
   cd client
   npm install

   # For backend
   cd ../server
   npm install
   ```

3. **Set Up Environment Variables**
   Create a `.env` file in the `server` directory with the following:

   ```env
   LASTFM_API_KEY=your_lastfm_api_key
   SPOTIFY_CLIENT_ID=your_spotify_client_id
   SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
   ```

4. **Start the Application**

   ```bash
   # Start backend
   cd server
   npm start

   # Start frontend
   cd ../client
   npm start
   ```

5. **Access the App**
   Open your browser and navigate to `http://localhost:3000`.

---

## Project Structure

```
FlavorBeat/
├── client/                 # Frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── App.js         # Main React app
│   │   ├── index.js       # Entry point
│   │   └── index.css      # CSS/SCSS file
│   └── public/            # Static assets
├── server/                 # Backend
│   ├── server.js          # Express app
│   └── .env               # Environment variables
└── README.md
```

---

## API Endpoints

### Tracks API:

- **GET /api/tracks?mood=happy**
  - Returns a list of enriched tracks based on the mood.

### Meals API:

- **GET /api/meals?cuisine=italian**
  - Returns a list of meals for the specified cuisine.
- **GET /api/meal?id=52961**
  - Returns detailed information about a specific meal, including YouTube link.

---

## Usage

1. **Select Your Mood**

   - Choose a mood from the interactive grid.
   - Automatically fetches music and cuisine recommendations.

2. **Explore Music**

   - Hover over a track to view details.
   - Click to open Spotify in a new tab.

3. **Discover Food**
   - Hover over cuisine images for a smooth overlay.
   - Click to explore recipes.

---

## Future Enhancements

- User authentication for personalized recommendations.
- Integration with wearable devices for real-time mood detection.
- Social sharing options for playlists and recipes.
- Advanced search filters for cuisines and tracks.

---

## Acknowledgments

- [Last.fm API](https://www.last.fm/api)
- [Spotify API](https://developer.spotify.com/documentation/web-api/)
- [TheMealDB API](https://www.themealdb.com/api.php)
- Pixabay for placeholder images.
