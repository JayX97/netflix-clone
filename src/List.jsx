import { Link } from 'react-router-dom';
import Selection from "./Selection";

const List = ({ loading, error, list, onSelection }) => {// main page on Router containing default anime list before query
  const listArray = list.data; // list.data is the main array containing anime series/movie objects from the JSON fetched
  console.log(listArray);
  
  if (loading) return <h3>Loading...</h3>;
  if (error) return <h3>{error}</h3>;

  return (
    <div id='list'>
      {listArray && listArray.map(anime => {
        return <Link to="/details" onClick={() => onSelection(anime)}>
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