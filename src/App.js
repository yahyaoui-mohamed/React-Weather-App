import React, { Component } from "react";
import './App.css';
import broken_clouds from "./assets/broken_clouds.png"
import clear_sky from "./assets/clear_sky.png"
import few_clouds from "./assets/few_clouds.png"
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
          main: data.weather[0].description
        })
      }
      else {
        this.setState({
          temp: (data.main.temp - 273).toFixed(2) + "°C",
          weather: data.weather[0].description,
          humidity: data.main.humidity + "%",
          cityName: input.value[0].toUpperCase() + input.value.substr(1),
          notFound: false,
          notSet: false
        })
      }
      console.log(data);
    }

  }
  render() {
    return (
      <div className="app" >
        <input placeholder="Enter name of city ex: Tunis" onKeyUp={this.showWeather} id="input" autoComplete="false" />
        {!this.state.notFound && !this.state.notSet ?
          <div className="weather">
            <h1>{this.state.cityName}</h1>
            <h2>{this.state.temp}</h2>
            <p>{this.state.weather}</p>
            <p>{this.state.humidity}</p>
            <img src={
              this.state.main === "clear sky" ? "./assets/clear_sky.png" :
                this.state.main === "broken_clouds" ? broken_clouds : ""


            }></img>
          </div> : this.state.notFound && !this.state.notSet ? <div>Invalid City Name.</div> : ""
        }
      </div>
    )
  }
}
export default App;