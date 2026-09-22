import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import Selection from "./Selection";
import PageSelector from "./PageSelector";

const List = ({ onSelection }) => {// main page on Router containing default anime list before query
  const [animeList, setAnimeList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  const PAGE_LIMIT = 18;
  
  // format query state value for fetch
  const baseUrl = `https://kitsu.io/api/edge/anime?page[limit]=${PAGE_LIMIT}`; // will use search input state variable as param query
  
  // * NOTE: a conditional is used for this value to accomodate for a bug present in the API affecting the pagination parameters **
  const pageQuery = query.trim() === "" ? `&page[offset]=${PAGE_LIMIT * (currentPage - 1)}` // formula used for pagination of dataset with limit of 20 entries per page
                                        : `&page[offset]=${PAGE_LIMIT * (currentPage)}`

  const queryParam = query.trim() === "" ? `&sort=popularityRank`
                                        : `&filter[text]=${encodeURIComponent(query)}`;
                                      
  // fetch list
  useEffect(() => {
    let ignore = false; // allows for the fetch to run once on strict mode

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${baseUrl}${pageQuery}${queryParam}`);
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        if (!ignore) { // only set data on latest mount (for strict mode)
          setAnimeList(data);
          setTotalPages(Math.ceil(data.meta.count / PAGE_LIMIT));
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();

    return () => ignore = true;
  }, [query, queryParam, currentPage]);

  const listArray = animeList.data; // list.data is the main array containing anime series/movie objects from the JSON fetched
  console.log(listArray);
  
  if (loading) return <h3 className="fetch-message">Loading...</h3>;
  if (error) return <h3 className="fetch-message">{error}</h3>;

  return (
    <div id='list'>
      <SearchBar query={query} onSearch={setQuery} resetPageCount={setCurrentPage} />
      <div id='list-selections'>
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
      {listArray && <PageSelector page={currentPage} maxPages={totalPages} onPageChange={setCurrentPage} />}
    </div>
  )
}

export default List;