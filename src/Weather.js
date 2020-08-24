import React from 'react';

function Weather(props) {

   return (
      <div className="Weather vbox">
         <div id="weather-main" className="hbox">
            <div id="weather-icon" className={`blow-slow icon ${props.iconClass}`}></div>
            <div className="hbox">
               <div className="vbox">
                  <span id="temp">{props.temp}</span>
                  <span id="desc">{props.desc}</span>
               </div>
               <div id="unit-toggle" className="vbox">
                  <span id="imperial">&deg;C</span>
                  <span id="metric" className="disabled">&deg;F</span>
               </div>
            </div>
         </div>
         <div id="location">{props.location}</div>
         <div id="datetime">updated as of {props.updatedAt}</div>
         <div id="weather-details" className="hbox">
            <div className="vbox">
               <div className="icon medium-icon icons-water"></div>
               <div id="humidity">{props.humidity}&#37;</div>
            </div>
            <div className="vbox">
               <div className="icon medium-icon icons-wind"></div>
               <div id="wind">{props.windSpeed}km/h</div>
            </div>
            <div className="vbox">
               <div className="icon medium-icon icons-eye"></div>
               <div id="visibility">{props.visibility}km</div>
            </div>
         </div>
      </div>
   );
}

export default Weather;