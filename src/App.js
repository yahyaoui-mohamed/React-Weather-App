import React, { Component } from "react";
import './App.css';
// import axios from "axios";

const API_KEY = "1e7621016802c50c28adea8425ac5d69";
class App extends Component {
  state = {
    temp: "",
    weather: "",
    humidity: "",
    cityName: ""
  }


  showWeather = async (e) => {
    if (e.key === "Enter") {
      let input = document.getElementById("input");
      const api = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${API_KEY}`);
      const data = await api.json();
      this.setState({
        temp: data.main.temp,
        weather: data.weather[0].description,
        humidity: data.main.humidity,
        cityName: input.value
      })
    }

  }
  render() {
    return (
      <div className="app" >
        <input placeholder="Enter name of city ex: Tunis" onKeyUp={this.showWeather} id="input" autoComplete="false" />
        {this.state.cityName ?
          (
            <div className="weather">
              <p>Temparature in {this.state.cityName}</p>
              < p >Temperature : {(Number(this.state.temp) - 273).toFixed(2)}</p>
              <p>Weather : {this.state.weather}</p>
              <p>Humidity : {this.state.humidity}%</p>
            </div>)

          : ""}
      </div>
    )
  }
}
export default App;
