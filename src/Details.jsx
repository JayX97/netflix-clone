import { Link } from 'react-router-dom';

const Details = ({ anime, onReturn }) => {// page displaying selected anime details
  return (
    <>
      {anime && <h3>{anime.title}</h3>}
      <Link to="/" onClick={() => onReturn(null)}><h4>Back</h4></Link>
    </>
  )
}

export default Details;