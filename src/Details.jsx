import { Link } from 'react-router-dom';

const Details = ({ anime, onReturn }) => {// page displaying selected anime details
  return (
    <>
      <h1>Test</h1>
      {anime && <h3>{anime.title}</h3>}
      <Link to="/" onClick={() => onReturn(null)}><h5>Back</h5></Link>
    </>
  )
}

export default Details;