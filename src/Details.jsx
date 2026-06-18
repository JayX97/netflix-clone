import { Link } from 'react-router-dom';

const Details = ({ anime, onReturn }) => {// page displaying selected anime details
  const status = anime.attributes.status
  const statusUpperCased = status.charAt(0).toUpperCase() + status.slice(1);
  
  return (
    <div className="selection-page">
      {anime && 
        <div className="selection-card">
          <img src={anime.attributes.posterImage.small} alt={anime.attributes.canonicalTitle} />
          <div className="selection-info">
            <h2>{anime.attributes.canonicalTitle}</h2>
            <button>Start Watching</button>
            <p>{anime.attributes.synopsis}</p>
            <div className="misc-data">
              <p>Episodes: {anime.attributes.episodeCount}</p>
              <p>Status: {statusUpperCased}</p>
              <p>Rating: {anime.attributes.averageRating}</p>
            </div>
          </div>
        </div>
      }
      <Link to="/" onClick={() => onReturn(null)}><h4>Back</h4></Link>
    </div>
  )
}

export default Details;