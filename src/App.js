import React from "react";
import "./App.css";
import Form from "./components/form.component";
import Weather from "./components/weather.component";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  WiThunderstorm,
  WiDaySunny,
  WiDayFog,
  WiSleet,
  WiStormShowers,
  WiSnow,
  WiFog,
} from "weather-icons-react";

// git project https://github.com/erikflowers/weather-icons
//import "weather-icons/css/weather-icons.css";

const Api_Key = "7bd4b9e87f0d895993051e437fd31a6b";
var bg =
  "C:/Users/Shubh/Desktop/shubhdeep dekstop/REACT/weather/weather/src/images/thunderstorm.png";
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: null,
      temp_min: null,
      description: "",
      error: false,
      errorelse: false,
    };

    this.weatherimage = {
      Thunderstorm:
        "C:/Users/Shubh/Desktop/shubhdeep dekstop/REACT/weather/weather/src/images/thunderstorm.png",
      Drizzle:
        "C:/Users/Shubh/Desktop/shubhdeep dekstop/REACT/weather/weather/src/images/drizzle.png",
      Snow:
        "C:/Users/Shubh/Desktop/shubhdeep dekstop/REACT/weather/weather/src/images/snow.png",
      Clear:
        "C:/Users/Shubh/Desktop/shubhdeep dekstop/REACT/weather/weather/src/images/clear.png",
      Fog:
        "C:/Users/Shubh/Desktop/shubhdeep dekstop/REACT/weather/weather/src/images/fog.png",
      Clouds:
        "C:/Users/Shubh/Desktop/shubhdeep dekstop/REACT/weather/weather/src/images/cloudy.png",
    };
    this.weatherIcon = {
      Thunderstorm: <WiThunderstorm size="80"></WiThunderstorm>,
      Drizzle: <WiSleet size="80"></WiSleet>,
      Rain: <WiStormShowers size="80"></WiStormShowers>,
      Snow: <WiSnow size="80"></WiSnow>,
      Atmosphere: <WiFog size="80"></WiFog>,
      Clear: <WiDaySunny size="80"></WiDaySunny>,
      Clouds: <WiDayFog size="80"></WiDayFog>,
    };
  }

  get_WeatherIcon(icons, back, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
        this.setState({ icon: icons.Thunderstorm });
        bg = back.Thunderstorm;
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: icons.Drizzle });
        bg = back.Drizzle;
        break;
      case rangeId >= 500 && rangeId <= 521:
        this.setState({ icon: icons.Rain });
        bg = back.Drizzle;
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: icons.Snow });
        bg = back.Snow;
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({ icon: icons.Atmosphere });
        bg = back.Fog;
        break;
      case rangeId === 800:
        this.setState({ icon: icons.Clear });
        bg = back.clear;
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({ icon: icons.Clouds });
        bg = back.Clouds;
        break;
      default:
        this.setState({ icon: icons.Clouds });
        bg = back.Thunderstorm;
    }
  }

  calCelsius(temp) {
    let cell = Math.floor(temp - 273.15);
    return cell;
  }

  getWeather = async (e) => {
    e.preventDefault();
    // console.log(e)
    const country = e.target.elements.country.value;
    const city = e.target.elements.city.value;

    if (country && city) {
      const api_call = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_Key}`
      );

      const response = await api_call.json();
      console.log(response);
      if (response.cod !== "404") {
        this.setState({
          city: `${response.name}, ${response.sys.country}`,
          country: response.sys.country,
          main: response.weather[0].main,
          celsius: this.calCelsius(response.main.temp),
          temp_max: this.calCelsius(response.main.temp_max),
          temp_min: this.calCelsius(response.main.temp_min),
          description: response.weather[0].description,
          error: false,
          errorelse: false,
        });

        // seting icons
        this.get_WeatherIcon(
          this.weatherIcon,
          this.weatherimage,
          response.weather[0].id
        );

        //console.log(response);
      } else {
        this.setState({
          errorelse: true,
        });
      }
    } else {
      this.setState({
        error: true,
      });
    }
  };

  render() {
    return (
      <div className="App">
        <Form
          loadweather={this.getWeather}
          error={this.state.error}
          errorelse={this.state.errorelse}
        />
        <Weather
          cityname={this.state.city}
          weatherIcon={this.state.icon}
          temp_celsius={this.state.celsius}
          temp_max={this.state.temp_max}
          temp_min={this.state.temp_min}
          description={this.state.description}
        />
      </div>
    );
  }
}

export default App;
export { bg };
