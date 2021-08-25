import React , {useState} from 'react';


function App() {

  
  const api = {
    key : 'f275ed6a7411a29f3c260b4d65feb2c5',
    base : 'https://api.openweathermap.org/data/2.5/'
  };
  

  const [query , setQuery] = useState('');

  const [weather , setWeather] = useState({});

 

  const search = (e) => {
    if (e.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery("");
        console.log(result);
      }); 
    }
  }
   
  
  const dateBuilder = (d) => {
    
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    
    let month = months[d.getMonth()];
    let day = days[d.getDay()];
    let date = d.getDate();
    let year = d.getFullYear();

    return `${date} ${day} ${month} ${year}`;

  };


  return (
    <div className="App">
     <div className="main">
        <div className= {(typeof weather.main != 'undefined') ? ((weather.main.temp > 20 ) ? 'container warm': 'container') : 'container'}>
          <h1>WEATHER APP </h1>
          <div className="search-box">
            <input type="text" 
                   className="search-bar" 
                   placeholder="Search here...."
                   onChange={e => setQuery(e.target.value)}
                   value={query}
                   onKeyPress={search}
            />
          </div>
          { (typeof weather.main != "undefined") ? (
                <div>
                  <div className="location-box">
                    <div className="location">{weather.name}, {weather.sys.country} </div>
                    <div className="date"> {dateBuilder(new Date())} </div>
                  </div>
                  <div className="weather-box">
                    <div className="temp">{Math.round(weather.main.temp)}°c</div>
                    <div className="weather">{weather.weather[0].description}</div>
                    <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="icon" width="100px" height="110px"/>
                  </div>
                </div>
          )  : ("")}

        </div   >
 
      </div>
    </div>
  );
}

export default App;
