import React from 'react';

function Welcome(props) {
   return (
      <div className="Welcome">
         <h1>WeatherApp</h1>
         <div className="stage">
            <div id="logo" className="bounce"></div>
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