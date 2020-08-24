import React from 'react';
import './App.css';

import Weather from './Weather';
import Welcome from './Welcome';

function App() {
   const [location, setLocation] = React.useState();
   const [weather, setWeather] = React.useState();
   const [errorMessage, setErrorMessage] = React.useState();

   React.useEffect(getLocation, []);

   function getLocation() {
      if(navigator.geolocation) {
         console.log('get location');
         navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            getWeather(lat, lon);
         }, () => {
            setErrorMessage("Please, enable geolocation to use this app");
         });
      } else {
         setErrorMessage("Geolocation is not supported by this browser");
      }
   }

   function getWeather(lat, lon) {
      console.log(lat, lon);
      const API = `https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lon}`;
      fetch(API)
         .then((response) => response.json())
         .then((data) => {
            if (data.name === "Shuzenji") {
               getWeather(lat, lon);
               return;
            }
            // Set location
            const location = `${data.name}, ${data.sys.country}`;
            setLocation(location);
            // Set weather information (in metrics)
            let weatherData = {};
            weatherData["type"] = data.weather[0].main;
            weatherData["description"] = data.weather[0].description;
            weatherData["temp"] = Math.round(data.main.temp * 10) / 10;
            weatherData["humidity"] = Math.round(data.main.humidity * 10) / 10;
            weatherData["windSpeed"] = Math.round(data.wind.speed * 10) / 10;
            weatherData["visibility"] = Math.round(data.visibility * 10) / 10;
            weatherData["iconPath"] = getIcon(data.weather[0].main, data.weather[0].description);

            setWeather(weatherData);
         })
         .catch((error) => {
            setErrorMessage("Failed to get weather");
         });
   }

   function getIcon(main, desc) {
      const root = "C:/Users/ngoum/Documents/coding/web_development/weather-app/public/icons/";
      switch (main) {
         case "Clouds":
            return root + "clouds.png";
         case "Clear":
            return root + "sun.png";
         default:
            return root + "no-cloud";
      }
   }

   return (
      <div className="App">
         {
            !location || !weather || errorMessage ? (
               <Welcome message={errorMessage} />
            ) : (
               <Weather location={location} />
            )
         }
         <p id="author">Coded By <a href="https://github.com/cdngouma" target="blank_">cdngouma</a>.</p>
      </div>
   );
}

export default App;
