const Selection = ({ imageUrl, title, episodes, status, season, year, score }) => {
  return (
    <div className="anime-selection">
      <img src={imageUrl} alt={title} />
      <div className="selection-details">
        <p className="selection-title">{title}</p>
        <p className="num-episodes">Number of episodes: {episodes}</p>
        <p className="selection-status">{status}</p>
        <p className="selection-season">{season} {year}</p>
        <p className="selection-rating">Rating: {score}</p>
      </div>
    </div>
  )
};

export default Selection;