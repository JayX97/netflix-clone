import { useState } from 'react';

const SearchBar = ({ query, onSearch }) => {
  const [input, setInput] = useState(query);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(input);
  }
  
  return (
    <div id='search'>
      <h3>Welcome to Anime Max! Please enter name of show or movie to access our vast library.</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  )
}

export default SearchBar;