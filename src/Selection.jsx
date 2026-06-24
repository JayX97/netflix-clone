const Selection = ({ imageUrl, title, episodes, status, score }) => {
  const selectionStatus = status.charAt(0).toUpperCase() + status.slice(1);
  
  return (
    <div className="anime-selection">
      <img src={imageUrl} alt={title} />
      <div className="selection-details">
        <p className="selection-title">{title}</p>
        <div className="selection-stats">
          <p className="num-episodes">Number of episodes: {episodes}</p>
          <p className="selection-status">{selectionStatus}</p>
          <p className="selection-rating">Rating: {score}</p>
        </div>
      </div>
    </div>
  )
};

export default Selection;