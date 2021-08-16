import React, { useState, useEffect } from 'react';
import { useLocation, Redirect } from 'react-router';
import { db } from "../services/firebase";
import {Intro, Lobby, WriteSentence, VoteSentence, RevealSentence, RevealScore, RevealFinalSentence, RevealFinalScore} from "./gamePhases/allPhases";
import {useCollectionData} from 'react-firebase-hooks/firestore';


function Game() {
   // States
   const [gameId, setGameId] = useState('')
   const [phase, setPhase] = useState('Intro')

   // list of game phases
   const phaseTable = {
      'Intro': <Intro />,
      'Lobby': <Lobby />,
      'WriteSentence': <WriteSentence />,
      'VoteSentence': <VoteSentence />,
      'RevealSentence': <RevealSentence />,
      'RevealScore': <RevealScore />,
      'RevealFinalSentence': <RevealFinalSentence />,
      'RevealFinalScore': <RevealFinalScore />,
   }
   
   // Slug
   const slug = useLocation().pathname.split("/").pop()

   // check db for match with slug
   function isSlugAGameId(){}

   // if match load and display data from db

   // if not, or if blank, load component that says: 'no game id' or similar

   useEffect(() => {
      if (slug !== 'game') setGameId(slug)
      else return <Redirect to='/' />
    }, []);

   return (

   <div className="App container">
      <div className="inner">
       <h1>Game</h1>
       <p>Game id might be {slug}{gameId}</p>
       <p>Change state in browser to see this change: </p>
       {phaseTable[phase]}
     </div>
   </div>
   );
 }

 export default Game;
