import React, { useState } from "react";
import './App.css';
import overcast_clouds from "./assets/overcast_clouds.jpg";
import clear_sky from "./assets/clear_sky.jpg";
import broken_clouds from "./assets/broken_clouds.jpg";

function App() {
  const API_KEY = "1e7621016802c50c28adea8425ac5d69";
  const [temp, setTemp] = useState("");
  const [weather, setWeather] = useState("");
  const [cityName, setCityName] = useState("");
  const [notFound, setNotFound] = useState(true);
  const [notSet, setNotSet] = useState(true);
  const [country, setCountry] = useState("");

  async function showWeather(e) {
    if (e.key === "Enter") {
      let input = document.getElementById("input");
      if (input.value === "")
        return;
      const api = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${API_KEY}`);
      const data = await api.json();

      if (api.status === 404) {
        setNotFound(true);
        setNotSet(false);
        return;
      }
      else {
        setTemp(Math.ceil((data.main.temp - 273).toFixed(2)) + "°C");
        setWeather(data.weather[0].description);
        setCityName(input.value[0].toUpperCase() + input.value.substr(1));
        setNotFound(false);
        setNotSet(false);
        setCountry(data.sys.country);
      }
    }
  }
  return (
    <div className="app" style=
      {weather === "overcast clouds" ? { backgroundImage: `url(${overcast_clouds})` } :
        weather === "clear sky" ? { backgroundImage: `url(${clear_sky})` } :
          weather === "broken clouds" ? { backgroundImage: `url(${broken_clouds})` } :
            { backgroundImage: `url()` }
      } >

      <input placeholder="Enter name of city ex: Tunis" onKeyUp={showWeather} id="input" autoComplete="off" />
      {
        !notFound && !notSet ?
          <div className="weather">
            <h1>{cityName}, {country}</h1>
            <div className="temp">
              <h2>{temp}</h2>
            </div>
            <div className="desc">
              <p>{weather}</p>
            </div>
          </div> : notFound && !notSet ? <div>Invalid City Name.</div> : ""
      }
    </ div >
  )
}
export default App;