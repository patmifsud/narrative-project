import React from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";


function Nav() {
   return (

         <div className="App">
            <p>Nav</p>
            {/* this doesn't work for some reason, not sure why */}
            {/* <Link to="/" >Home</Link>
            <Link to="/play" >Game</Link> */}
         </div>

   );
 }
 
 export default Nav;
 