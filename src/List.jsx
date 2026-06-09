import { Link } from 'react-router-dom';

const List = ({ loading, error, list, onSelection }) => {// main page on Router containing default anime list before query
  const listArray = list.data; // list.data is the main array containing anime series/movie objects from the JSON fetched
  console.log(listArray);
  
  if (loading) return <h3>Loading...</h3>;
  if (error) return <h3>{error}</h3>;

  return (
    <div id='list'>
      {listArray && listArray.map(anime => {
        return <Link to="/details" onClick={() => onSelection(anime)}><h4>{anime.title}</h4></Link>;
      })}
    </div>
  )
}

export default List;