import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import Selection from "./Selection";

const List = ({ onSelection }) => {// main page on Router containing default anime list before query
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  
  // format query state value for fetch
  const baseUrl = "https://kitsu.io/api/edge/anime?page[limit]=20"; // will use search input state variable as param query
  const queryParam = query.trim() === "" ? `&sort=popularityRank`
                                        : `&filter[text]=${encodeURIComponent(query)}`;
                                      
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
  }, [query, queryParam]);

  const listArray = animeList.data; // list.data is the main array containing anime series/movie objects from the JSON fetched
  console.log(listArray);
  
  if (loading) return <h3>Loading...</h3>;
  if (error) return <h3>{error}</h3>;

  return (
    <div id='list'>
      <SearchBar onSearch={setQuery} />
      {listArray && listArray.map(anime => {
        return <Link to={`/${anime.id}-details`} onClick={() => onSelection(anime.id)}>
          <Selection
            key={anime.id}
            imageUrl={anime.attributes.posterImage.small}
            title={anime.attributes.canonicalTitle}
            episodes={anime.attributes.episodeCount}
            status={anime.attributes.status}
            score={anime.attributes.averageRating}
          />
        </Link>;
      })}
      {(!listArray || listArray.length === 0) && <h3>No matches available.</h3>}
    </div>
  )
}

export default List;