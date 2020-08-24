import React from 'react';

function Weather(props) {
   return (
      <div className="Weather">
         <h1>{ props.location }</h1>
      </div>
   );
}

export default Weather;