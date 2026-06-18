import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

const Details = ({ selectionId, onReturn }) => {// page displaying selected anime details
  const [animeData, setAnimeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let status;

  if (animeData) {
    status = animeData.attributes.status.charAt(0).toUpperCase() + animeData.attributes.status.slice(1);
  }

  const queryUrl = `https://kitsu.io/api/edge/anime?filter[id]=${selectionId}`;

  useEffect(() => {
      let ignore = false; // allows for the fetch to run once on strict mode
  
      const fetchData = async () => {
        try {
          setLoading(true);
          setError(null);
  
          const response = await fetch(queryUrl);
          
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
  
          const result = await response.json();
          if (!ignore) setAnimeData(result.data[0]); // only set data on latest mount (for strict mode)
  
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
      
      fetchData();
  
      return () => ignore = true;
    }, [queryUrl]);
  
  console.log(animeData);

  if (loading) return <h3>Loading...</h3>;
  if (error) return <h3>{error}</h3>;
  
  return (
    <div className="selection-page">
      {animeData && 
        <div className="selection-card">
          <img src={animeData.attributes.posterImage.small} alt={animeData.attributes.canonicalTitle} />
          <div className="selection-info">
            <h2>{animeData.attributes.canonicalTitle}</h2>
            <button>Start Watching</button>
            <p>{animeData.attributes.synopsis}</p>
            <div className="misc-data">
              <p>Episodes: {animeData.attributes.episodeCount}</p>
              <p>Status: {status}</p>
              <p>Rating: {animeData.attributes.averageRating}</p>
            </div>
          </div>
        </div>
      }
      <Link to="/" onClick={() => onReturn(null)}><h4>Back</h4></Link>
    </div>
  )
}

export default Details;