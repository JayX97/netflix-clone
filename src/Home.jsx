const Home = ({ list }) => {// main page on Router containing title, search bar and anime selection before query
  // list.data
  const listArray = list.data;
  console.log(listArray);
  
  return (
    <div id='welcome-section'>
      <h1>Anime Max</h1>
      <h3>Welcome to Anime Max! Please enter name of show or movie to access our vast library.</h3>
      <div id='search'>
        <input type="'text"></input>
        <button>Search</button>
      </div>
    </div>
  )
}

export default Home;