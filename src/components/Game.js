import React, { useState, useEffect } from 'react';
import { useLocation, Redirect } from 'react-router';
import {rules} from '../helpers/rules.js';
import { db } from "../services/firebase";
import {Intro, Lobby, WriteSentence, VoteSentence, RevealSentence, RevealScore, RevealFinalScore} from "./gamePhases/allPhases";
import {useCollectionData} from 'react-firebase-hooks/firestore';


function Game() {
   //--------------------------
   // STATES
      const [gameId, setGameId] = useState('')
      const [phase, setPhase] = useState('Intro')

      // Temporary or may be moved elsewhere
      const [playerIsHost, setPlayerIsHost] = useState(true)
      const [playerIsReady, setPlayerIsReady] = useState(false)

      // 100% just for testing, will be replaced in firebase or similar
      const [testAllPlayersReady, setTestAllPlayersReady] = useState(false)
      const [roundCounter, setroundCounter] = useState(1)


   //--------------------------
   // Non-state variables
   // deadman switch - timer increments while players aren't ready, if reaches 50 game is killed
   let gameTimeOutLimit = 0

   // urlSlug
   const urlSlug = useLocation().pathname.split("/").pop()

   // list of game phases and game phase components
   const phaseTable = {
      'Lobby': {'component': <Lobby onCompletion={handleSubmitOrTimeout}/>, 'next': 'Intro' },
      'Intro': {'component': <Intro onCompletion={handleSubmitOrTimeout} />, 'next': 'WriteSentence' },
      'WriteSentence': {'component': <WriteSentence onCompletion={handleSubmitOrTimeout}/>, 'next': 'VoteSentence' },
      'VoteSentence': {'component': <VoteSentence onCompletion={handleSubmitOrTimeout}/>, 'next': 'RevealSentence' },
      'RevealSentence': {'component': <RevealSentence onCompletion={handleSubmitOrTimeout}/>, 'next': 'RevealScore' },
      'RevealScore': {'component': <RevealScore onCompletion={handleSubmitOrTimeout}/>, 'next': 'WriteSentence' }, // <- loops
      'RevealFinalScore': {'component': <RevealFinalScore onCompletion={handleSubmitOrTimeout}/>, 'next': 'Lobby' }
   }


   //--------------------------
   // FUNCTIONS: Initalse game

   // check db for match with urlSlug

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
   }

   function nextGamePhase() {
      console.log('next game phase')
      // show loading animation
      // get current game phase from firebase
      // const of next game phase
      // update game phase state in server
      if (phase == 'RevealScore'){
         setroundCounter(roundCounter + 1)
         if (roundCounter >= rules.gameLength){
            setPhase('RevealFinalScore');
            return 
         }
      } 
      console.log("looks like everyones ready, so setting the game phase to:" + phaseTable[phase].next)
      setPlayerIsReady(false)
      setTestAllPlayersReady(false)
      setPhase(phaseTable[phase].next)

      // (local game phase should change automically once server is updated fingers crossed)
   }

   // gets the game id from the url once on load 
   useEffect(() => {
      // check if urlslug = gameid in server
      if (urlSlug !== 'game') setGameId(urlSlug)
      // else load component 404
      // Create user here? 
   }, []);

   // Are all players ready? 
   useEffect(() => {
      if (playerIsHost) {
         // TO DO: replace with 'if all players in firebase ready = true'
         if (testAllPlayersReady){
            nextGamePhase()
            return
   }}}, [testAllPlayersReady]);
   // TO DO:  replace ^ 'testAllPlayersReady' with something that checks firebase for any user being ready, or any change to game obj


   return (
      <div className="App container">
         <div className="inner">
         <h1>Game</h1>
         </div>
         <div className="inner">
            <h5>TEST PANNEL</h5>
            <a onClick={() => {setTestAllPlayersReady(true)}}> Set all players to ready </a>
            <a onClick={() => {handleSubmitOrTimeout()}}> Set me to ready </a>
            <p>Game id is {gameId}</p>
            <p>Current phase: {phase}</p>
            <p>Round: {roundCounter} / {rules.gameLength} </p>
            <p>Player is host: { playerIsHost ? "✅" : "❌"}</p>
            <p>Current player ready: { playerIsReady ? "✅" : "❌"}</p>
            <p>All players ready: { testAllPlayersReady ? "✅" : "❌" }</p>
            <hr />
         </div>

         {phaseTable[phase].component}

      </div>
   );
 }

 export default Game;
