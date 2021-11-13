import React, { Component } from "react";
import './App.css';

// Background Images Imports
import overcast_clouds from "./assets/overcast_clouds.jpg";
import clear_sky from "./assets/clear_sky.jpg";
import broken_clouds from "./assets/broken_clouds.jpg";




const API_KEY = "1e7621016802c50c28adea8425ac5d69";
class App extends Component {
  state = {
    temp: "",
    weather: "",
    humidity: "",
    cityName: "",
    notFound: true,
    notSet: true,
    main: ""
  }


  showWeather = async (e) => {
    if (e.key === "Enter") {
      let input = document.getElementById("input");
      if (input.value === "")
        return;
      const api = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${API_KEY}`);
      const data = await api.json();

      if (api.status === 404) {
        this.setState({
          temp: "",
          weather: "",
          humidity: "",
          cityName: "",
          notFound: true,
          notSet: false,
          main: ""
        })
      }
      else {
        this.setState({
          temp: Math.ceil((data.main.temp - 273).toFixed(2)) + "°C",
          weather: data.weather[0].description,
          humidity: data.main.humidity + "%",
          cityName: input.value[0].toUpperCase() + input.value.substr(1),
          notFound: false,
          notSet: false,
          country: data.sys.country
        })
      }
    }

  }
  render() {
    return (
      <div className="app" style=
        {this.state.weather === "overcast clouds" ? { backgroundImage: `url(${overcast_clouds})` } :
          this.state.weather === "clear sky" ? { backgroundImage: `url(${clear_sky})` } :
            this.state.weather === "broken clouds" ? { backgroundImage: `url(${broken_clouds})` } :
              { backgroundImage: `url()` }
        } >

        <input placeholder="Enter name of city ex: Tunis" onKeyUp={this.showWeather} id="input" autoComplete="off" />
        {
          !this.state.notFound && !this.state.notSet ?
            <div className="weather">
              <h1>{this.state.cityName}, {this.state.country}</h1>
              <div className="temp">
                <h2>{this.state.temp}</h2>
              </div>
              <div className="desc">
                <p>{this.state.weather}</p>
              </div>
            </div> : this.state.notFound && !this.state.notSet ? <div>Invalid City Name.</div> : ""
        }
      </ div >
    )
  }
}
export default App;