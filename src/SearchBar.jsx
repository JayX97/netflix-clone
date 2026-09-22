import { useState } from 'react';

const SearchBar = ({ query, onSearch, resetPageCount }) => {
  const [input, setInput] = useState(query);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(input);
    resetPageCount(1);
  }
  
  return (
    <div id='search'>
      <h3>Welcome to ANIME MAX! Please enter name of show or movie to access our vast library.</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit"><span class="material-symbols-outlined">search</span></button>
      </form>
    </div>
  )
}

export default SearchBar;