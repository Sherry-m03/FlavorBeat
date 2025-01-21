import Home from "./components/Home.js";
import Cuisine from "./components/Cuisine.js";
import Music from "./components/Music.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search-music" element={<Music />} />
          <Route path="/cuisine-dishes" element={<Cuisine />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
