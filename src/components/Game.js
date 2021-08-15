import React, { useState } from 'react';
import { useLocation } from 'react-router';

// template for states
// const [count, setCount] = useState(4)
// function decrememberCount(prevCount) {
//    setCount(prevCount - 1)
// }

function Game() {
   // get url params
   const url = useLocation().pathname
   const slug = url.split("/").pop()
   console.log(slug)

   // if url params are a game code, get that game from the db
      //ggg444 is the test code
      //make sure this is case insensisitve etc
   // if not - take the user back to homepage


   return (
   

   <div className="App container">
      <div className="inner">
       <h1>Game</h1>
     </div>
   </div>
   );
 }
 
 export default Game;
 