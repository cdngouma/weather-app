import React from 'react';

function Weather(props) {
   const iconClass = props.iconClass;
   const location = props.location;
   const updatedAt = props.updatedAt;
   const weather = props.weather;
   const unitSystem = props.unitSystem;

   return (
      <div className="Weather vbox">
         <div id="weather-main" className="hbox">
            <div id="weather-icon" className={`blow-slow icon ${iconClass}`}></div>
            <div className="hbox">
               <div className="vbox">
                  <span id="temp">{weather.temp[unitSystem]}</span>
                  <span id="desc">{weather.description}</span>
               </div>
               <div id="unit-toggle" className="vbox">
                  <input type="radio" id="isu" name="unit-syst" onChange={props.toggle} defaultChecked value="isu"/>
                  <label htmlFor="isu">&deg;C</label>
                  <input type="radio" id="uscs" name="unit-syst" onChange={props.toggle} value="uscs"/>
                  <label htmlFor="uscs">&deg;F</label>
               </div>
            </div>
         </div>
         <div id="location">{location}</div>
         <div id="datetime">updated as of {updatedAt}</div>
         <div id="weather-details" className="hbox">
            <div className="vbox">
               <div className="icon medium-icon icons-water"></div>
               <div id="humidity">{weather.humidity}</div>
            </div>
            <div className="vbox">
               <div className="icon medium-icon icons-wind"></div>
               <div id="wind">{weather.windSpeed[unitSystem]}</div>
            </div>
            <div className="vbox">
               <div className="icon medium-icon icons-eye"></div>
               <div id="visibility">{weather.visibility[unitSystem]}</div>
            </div>
         </div>
      </div>
   );
}

export default Weather;