import { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import List from "./List";
import Details from "./Details";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selection, setSelection] = useState(() => { // * LAZY INITIALIZER FUNCTION TO STORE SELECTION THROUGH REFRESHES USING localStorage *
    const anime = localStorage.getItem('selection');
    
    return anime ? JSON.parse(anime) : null;
  }); // selection via anime object clicked in List component
  const [query, setQuery] = useState("");

  const baseUrl = "https://api.jikan.moe/v4/anime"; // will use search input state variable as param query
  const queryParam = query.trim() === "" ? `?order_by=${encodeURIComponent("popularity")}`
                                        : `?q=${encodeURIComponent(query)}`;
                                        
  // * PRESERVE SELECTION THROUGH REFRESH *
  useEffect(() => {
    localStorage.setItem('selection', JSON.stringify(selection));
  }, [selection]);

  // fetch list
  useEffect(() => {
    let ignore = false; // allows for the fetch to run once on strict mode

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${baseUrl}${queryParam}`);
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        if (!ignore) setAnimeList(data); // only set data on latest mount (for strict mode)

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();

    return () => ignore = true;
  }, [query]);

  return (
    <div id='app'>
      <div id='welcome-section'>
        <h1>Anime Max</h1>
        {!selection && <SearchBar onSearch={setQuery} />}
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<List loading={loading} error={error} list={animeList} onSelection={setSelection} />} />
          <Route path="/details" element={<Details anime={selection} onReturn={setSelection} />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
