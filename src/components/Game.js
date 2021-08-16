import React, { useState, useEffect } from 'react';
import { useLocation, Redirect } from 'react-router';
import { db } from "../services/firebase";
import {Intro, Lobby, WriteSentence, VoteSentence, RevealSentence, RevealScore, RevealFinalSentence, RevealFinalScore} from "./gamePhases/allPhases";
import {useCollectionData} from 'react-firebase-hooks/firestore';



function Game() {
   //--------------------------
   // STATES
      const [gameId, setGameId] = useState('')
      const [phase, setPhase] = useState('Intro')

      // Temporary or may be moved elsewhere
      const [playerIsHost, setPlayerIsHost] = useState(true)
      const [playerIsReady, setPlayerIsReady] = useState(false)
      
      // 100% just for testing, will be replaced
      const [testAllPlayersReady, setTestAllPlayersReady] = useState(false)


   //--------------------------
   // Non-state variables
   // deadman switch - timer increments while players aren't ready, if reaches 50 game is killed
   let gameTimeOutLimit = 0

   // urlSlug
   const urlSlug = useLocation().pathname.split("/").pop()


   // list of game phases and game phase components
   const phaseTable = {
      'Intro': <Intro onCompletion={handleSubmitOrTimeout} />,
      'Lobby': <Lobby onCompletion={handleSubmitOrTimeout}/>,
      'WriteSentence': <WriteSentence onCompletion={handleSubmitOrTimeout}/>,
      'VoteSentence': <VoteSentence onCompletion={handleSubmitOrTimeout}/>,
      'RevealSentence': <RevealSentence onCompletion={handleSubmitOrTimeout}/>,
      'RevealScore': <RevealScore onCompletion={handleSubmitOrTimeout}/>,
      'RevealFinalSentence': <RevealFinalSentence onCompletion={handleSubmitOrTimeout}/>,
      'RevealFinalScore': <RevealFinalScore onCompletion={handleSubmitOrTimeout}/>,
   }

   //--------------------------
   // FUNCTIONS: Initalse game

   // check db for match with urlSlug
   function isurlSlugAGameId(){

   }

   // if match load and display data from db

   // if not, or if blank, load component that says: 'no game id' or similar

   // funciton to update phase state of component based on state of game obj in db
      


   //--------------------------
   // FUNCTIONS: GAME PLAY

   function checkIfAllPlayersReady(){
      // TODO: will check all players within game obj in database for ready = true
      // if one or more isn't ready, returns false
      return testAllPlayersReady
   }

   function handleSubmitOrTimeout(){
      setPlayerIsReady(true);
      // TODO: sync player readyness with firebase
      if (playerIsHost) {
         listenForAllPlayersReady()
      }
   }

   function listenForAllPlayersReady() {
      if (checkIfAllPlayersReady){
         console.log("all players ready");
         // TO DO set phase to next phase
         gameTimeOutLimit = 0
         return
      } 
      if (gameTimeOutLimit == 50){
         alert("Your game has timed out, please create a new game and try again");
         // TO DO send back to home/ cancel game. Maybe break out into different funciton and trigger from somehwere else
         return
      }
      setTimeout(checkIfAllPlayersReady, 1000);
   }

   function nextGamePhase() {
      // show loading animation
      // get current game phase from firebase
      // const of next game phase
      // update game phase state in server
      // (local game phase should change automically once server is updated fingers crossed)
   }


   // gets the game id from the url after a short delay
   useEffect(() => {
      // check if urlslug = gameid in server
      if (urlSlug !== 'game') setGameId(urlSlug)
      // else load component 404
   }, []);

   return (

   <div className="App container">
      <div className="inner">
       <h1>Game</h1>
      </div>
      <div className="inner">
         <h5>TEST PANNEL</h5>
         <a onClick={() => {setTestAllPlayersReady(true)}}> Set all players to ready </a>
         <a onClick={() => {setPlayerIsReady(true)}}> Set me to ready </a>
         <p>Game id is {gameId}</p>
         <p>Current phase: {phase}</p>
         <p>Current player ready: { playerIsReady ? "✅" : "❌"}</p>
         <p>All players ready: { testAllPlayersReady ? "✅" : "❌" }</p>
         <hr />
      </div>

      {phaseTable[phase]}
      
   </div>
   );
 }

 export default Game;
