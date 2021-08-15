import React, { useState, useEffect } from 'react';
import { useLocation, Redirect } from 'react-router';

function Game() {
   const [gameId, setGameId] = useState('')

   const url = useLocation().pathname

   // Get url params
   function getUrlSlug() {
         return url.split("/").pop()
   }

   // check db for match

   // if match load and display data from db

   // if not, or if blank, load component that says: 'no game id' or similar

   useEffect(() => {
      if (getUrlSlug) setGameId(getUrlSlug())
      else return <Redirect to='/' />
    }, []);

   return (
   
   <div className="App container">
      <div className="inner">
       <h1>Game</h1>
     </div>
   </div>
   );
 }
 
 export default Game;
 