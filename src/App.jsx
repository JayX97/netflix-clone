import { useState, useEffect } from 'react';
import List from "./List";
import Details from "./Details";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  const [selection, setSelection] = useState(() => { // * LAZY INITIALIZER FUNCTION TO STORE SELECTION THROUGH REFRESHES USING localStorage *
    const anime = localStorage.getItem('selection');
    
    return anime ? JSON.parse(anime) : null;
  }); // selection via anime object clicked in List component

  // * PRESERVE SELECTION THROUGH REFRESH *
  useEffect(() => {
    localStorage.setItem('selection', JSON.stringify(selection));
  }, [selection]);

  return (
    <div id='app'>
      <div id='welcome-section'>
        <h1>Anime Max</h1>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<List onSelection={setSelection} />} />
          <Route path={`/${selection}-details`} element={<Details selectionId={selection} onReturn={setSelection} />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
