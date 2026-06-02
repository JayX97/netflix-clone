import { useState, useEffect } from 'react';
import Home from "./Home";
import Details from "./Details";
import './App.css';

function App() {
  const [animeList, setAnimeList] = useState([]);

  // fetch list
  useEffect(() => {
    const fetchAnime = async () => {
      const response = await fetch('https://api.jikan.moe/v4/anime');
      const data = await response.json();
      setAnimeList(data);
    }
    fetchAnime();
  }, []);

  return (
    <div id='app'>
      <Home list={animeList} />
      <Details />
    </div>
  )
}

export default App
