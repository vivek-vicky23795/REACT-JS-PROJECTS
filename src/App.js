
import './App.css';
import React , {useState,useEffect}  from 'react';

function App() {

  let [movieinfo , setMovieinfo] = useState(null);
  let [title,setTitle] = useState("The Lion King");


  useEffect(()=> {
      getMovieData();
  },[]);


  function readTitle(value) {
    setTitle(value);
  }

  function getMovieData() {

    let url = `https://omdbapi.com/?t=${title}&apikey=4b181e9e`;
  
    fetch(url)
    .then((response)=> response.json())
    .then((movie)=> {

      console.log(movie);
      setMovieinfo(movie);
    })
    .catch((err)=> {
      console.log(err);
    })
  }

  return (
    <div className="App">

      <div className="container">
        <div className="padd">
          <h1>Movie Search Details</h1>

          <div className='input-group'>
            <input type="text" placeholder="Enter Movie Name"  onChange={(event) => {readTitle(event.target.value)}}  className="search-field"  />
            <button className="btn" onClick={getMovieData}> Get Movie</button>
          </div>
        </div>

        {
        
            movieinfo?.Error !== "Movie not found!" ?(

                      <div className="movie">
                        <div className="poster">
                          <img src={movieinfo?.Poster} alt="img" className="img-poster"/>
                        </div>
                        <div className="details">
                          <div className="padd-1">
                              <p className="p1"> <strong>{movieinfo?.Title.toUpperCase()}</strong></p>
                              <hr />
                              <p> <strong>Genre - </strong> {movieinfo?.Genre} </p>
                              <p> <strong>Director - </strong> {movieinfo?.Director} </p>
                              <p> <strong>Plot - </strong> {movieinfo?.Plot} </p>
                              <p> <strong>Cast - </strong> {movieinfo?.Actors} </p>
                              <p> <strong>Box-office - </strong> {movieinfo?.BoxOffice} </p> 
                              <p> <strong>Year - </strong> {movieinfo?.Released} </p> 
                              <p> <strong>Language - </strong> {movieinfo?.Language} </p> 
                                <div className="rating">
                                  {
                                    movieinfo?.Ratings.map((rating,index)=> (
                                      <div key={index}>
                                        <strong>{rating.Source}</strong>
                                        <h4>{rating.Value}</h4>
                                      </div>
                                      ))  
                                    }
                                  </div>
                            </div>
                          </div>
                    </div>
              ):
              (
                <div className="error">
                  <h1> Movie Not Found..</h1>
                  <h2> Please Check the Spelling of the Movie Or Movie is Not Available in our DataBase... </h2>
                </div>
              )
        }
      </div>
    </div>
  );
}

export default App;
