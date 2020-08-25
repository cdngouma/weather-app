import React from 'react';
import './Welcome.css';

function Welcome(props) {
   return (
      <div className="Welcome vbox">
         <h1>WeatherApp</h1>
         <div className="stage">
            <div id="logo" className="icon bounce"></div>
         </div>
         {
            props.message ? (
               <p className="error">{ props.message}</p>
            ) : (
               <p>Searching Location...</p>
            )
         }
      </div>
   );
}

export default Welcome;