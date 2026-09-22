const PageSelector = ({ page, maxPages, onPageChange }) => {
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.target);
    const newPage = data.get('current-page');
    onPageChange(newPage);
  }
  
  return (
    <form id="page-info" onSubmit={handleSubmit}>    
      <button 
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      ><span class="material-symbols-outlined">keyboard_arrow_left</span></button>
      <div id="page-number">
        <input
          id="current-page"
          type="number"
          min={1}
          max={maxPages}
          name="current-page"
          defaultValue={page}
        />
        <p>of </p>
        <p>{maxPages}</p>
      </div>
      <button 
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page === maxPages}
      ><span class="material-symbols-outlined">keyboard_arrow_right</span></button>
    </form>
  )
}

export default PageSelector;