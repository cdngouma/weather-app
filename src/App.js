import React from 'react';
import './App.css';

import Weather from './Weather';
import Welcome from './Welcome';

function App() {
   const [location, setLocation] = React.useState();
   const [weather, setWeather] = React.useState();
   const [updatedAt, setUpdatedAt] = React.useState();
   const [unitSystem, setUnitSystem] = React.useState("isu");
   const [errorMessage, setErrorMessage] = React.useState();

   React.useEffect(getLocation, []);

   function getLocation() {
      if(navigator.geolocation) {
         navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            getWeather(lat, lon);
         }, () => {
            setErrorMessage("Please, enable geolocation to use this app");
         });
      } else {
         setErrorMessage("Geolocation is not supported by this device");
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
            // Set weather information (in isus)
            let weatherData = {};
            weatherData["type"] = data.weather[0].main;
            weatherData["description"] = data.weather[0].description;
            weatherData["temp"] = {
               "isu": Math.round(data.main.temp*10)/10,
               "uscs": Math.round((data.main.temp*9/5 + 32)*10)/10
            };
            weatherData["windSpeed"] = {
               "isu": Math.round(data.wind.speed*10)/10 + "km/h",
               "uscs": Math.round(data.wind.speed/1.609*10)/10 + "mph"
            }
            weatherData["visibility"] = {
               "isu": Math.round(data.visibility*10)/10 + "km",
               "uscs": Math.round(data.visibility/1.609*10)/10 + "mi"
            }

            weatherData["humidity"] = Math.round(data.main.humidity*10)/10 + "%";

            const today = new Date();
            const isNight = today >= data.sys.sunset || today <= data.sys.sunrise;
            weatherData["iconPath"] = getIconClass(data.weather[0].main, isNight);

            setWeather(weatherData);

            setUpdatedAt(getCurrentDatetime());
         })
         .catch((error) => {
            setErrorMessage("Failed to get weather");
         });
   }

   function toggleUnitSystem(event) {
      if(event.target.checked) {
         setUnitSystem(event.target.value);
      }
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

   function getIconClass(desc, isNight) {
      switch (desc.toLowerCase()) {
         case "clouds":
            if (isNight) return "icons-night-cloudy";
            return "icons-cloudy";
         case "clear":
            if (isNight) return "icons-night-clear"
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
                        weather={ weather }
                        unitSystem={ unitSystem }
                        updatedAt={ updatedAt } 
                        toggle={ toggleUnitSystem }/>
            )
         }
         <p id="author">Coded by <a href="https://github.com/cdngouma" target="blank_">cdngouma</a>.</p>
      </div>
   );
}

export default App;
