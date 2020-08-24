import React from 'react';
import './App.css';

import Weather from './Weather';
import Welcome from './Welcome';

function App() {
   const [location, setLocation] = React.useState();
   const [weather, setWeather] = React.useState();
   const [updatedAt, setUpdatedAt] = React.useState();
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
            weatherData["iconPath"] = getIconClass(data.weather[0].main, data.weather[0].description);

            setWeather(weatherData);

            setUpdatedAt(getCurrentDatetime());
         })
         .catch((error) => {
            setErrorMessage("Failed to get weather");
         });
   }

   function getCurrentDatetime() {
      const today = new Date();
      let dd = today.getDate();
      let mm = today.getMonth()+1;
      let yyyy = today.getFullYear();
      let h = today.getHours();
      let m = today.getMinutes();
      let meridiam = 'AM';

      if(m < 10) {
         m = '0'+m;
      }
      
      if(h > 12) {
         h = h%12;
         meridiam = 'PM';
      }

      return `${mm}/${dd}/${yyyy} ${h}:${m} ${meridiam}`;
   }

   function getIconClass(desc, detail) {
      console.log(desc, detail);
      desc = desc.toLowerCase();
      switch (desc) {
         case "clouds":
            return "icons-cloudy";
         case "clear":
            return "icons-sunny";
         case "rain":
            return "icons-rainy-2";
         case "snow":
            return "icons-snowy";
         case "thunderstorm":
            return "icons-stormy";
         case "drizzle":
            return "icons-rainy";
         default:
            return "icons-cloudy-2";
      }
   }

   return (
      <div className="App">
         {
            !location || !weather || errorMessage ? (
               <Welcome message={ errorMessage } />
            ) : (
               <Weather location={ location }
                        iconClass={ weather.iconPath } 
                        desc={ weather.description}
                        temp={ weather.temp }
                        humidity={ weather.humidity }
                        windSpeed={ weather.windSpeed }
                        visibility={ weather.visibility }
                        updatedAt={ updatedAt } />
            )
         }
         <p id="author">Coded by <a href="https://github.com/cdngouma" target="blank_">cdngouma</a>.</p>
      </div>
   );
}

export default App;
