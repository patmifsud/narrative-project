import React, { useState, useEffect } from 'react';
import { useLocation, Redirect } from 'react-router';
import { db, auth } from '../services/firebase'

// import {useCollectionData} from 'react-firebase-hooks/firestore';
// import { db } from "../services/firebase";
import {rules} from '../helpers/rules.js';
import {Intro, Lobby, WriteSentence, VoteSentence, RevealSentence, RevealScore, RevealFinalScore} from "./gamePhases/allPhases";

function Game() {
   //--------------------------
   // STATES
      const [phase, setPhase] = useState('Lobby')
      const [players, setPlayers] = useState([])

      // Temporary or may be moved elsewhere
      const [playerIsHost, setPlayerIsHost] = useState(true)
      const [playerIsReady, setPlayerIsReady] = useState(false)
      const [playerRole, setPlayerRole] = useState('writer')

      const [sentences, setSentences] = useState([])
      const [story, setStory] = useState([])

      // 100% just for testing, will be replaced in firebase or similar
      const [testAllPlayersReady, setTestAllPlayersReady] = useState(false)
      const [roundCounter, setroundCounter] = useState(1)

   // gameId
   const gameId = useLocation().pathname.split("/").pop()

   // list of game phases and game phase components
   const phaseTable = {
      'Lobby': {'component': <Lobby onCompletion={handleSubmitOrTimeout}/>, 'next': 'Intro' },
      'Intro': {'component': <Intro onCompletion={handleSubmitOrTimeout} />, 'next': 'WriteSentence' },
      'WriteSentence': {'component': <WriteSentence story={story} submitTo={setSentences} onCompletion={handleSubmitOrTimeout}/>, 'next': 'VoteSentence' },
      'VoteSentence': {'component': <VoteSentence story={story} chooseFrom={sentences} submitTo={setStory} onCompletion={handleSubmitOrTimeout}/>, 'next': 'RevealSentence' },
      'RevealSentence': {'component': <RevealSentence story={story}  clear={setSentences} onCompletion={handleSubmitOrTimeout}/>, 'next': 'RevealScore' },
      'RevealScore': {'component': <RevealScore story={story} onCompletion={handleSubmitOrTimeout}/>, 'next': 'WriteSentence' }, // <- loops
      'RevealFinalScore': {'component': <RevealFinalScore onCompletion={handleSubmitOrTimeout}/>, 'next': 'Lobby' }
   }

   //--------------------------
   // FUNCTIONS: Initalse game

   // check db for match with gameId

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

   function cyclePlayerRoles(){
      if  (playerIsHost) {
      // TODO
      // Temp code for testing
         if (playerRole == 'writer') setPlayerRole('editor');
         if (playerRole == 'editor') setPlayerRole('writer');
      }
   }

   function hostNextGamePhase() {
      console.log('next game phase')
      // show loading animation
      // get current game phase from firebase
      // const of next game phase
      // update game phase state in server
      if (phase == 'RevealScore'){
         setroundCounter(roundCounter + 1)
         cyclePlayerRoles();
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

   // 🔥🔥🔥 FIREBASE
   useEffect(() => {
      // 📅 🔥 update phase in game state when phase changes in db
      db.collection('games').doc(gameId).onSnapshot(snapshot => {
         setPhase(snapshot.data().phase)
      })

      // 📖 🔥 update story in game state when story changes in db
      db.collection('games').doc(gameId).collection('story').onSnapshot(function(querySnapshot) {
            let allStories = []
            if (querySnapshot.docs.length > 0) {
               querySnapshot.docs.forEach(doc => {
                  allStories.push(doc.data())
               })
               setStory(allStories)
               console.log(' '); console.log("Getting new stories from DB:"); console.log(allStories);
            } else console.log('no stories yet');
      })

      // 👤 🔥 update player data in game state when story changes in db
      db.collection('games').doc(gameId).collection('players').onSnapshot(function(querySnapshot) {
         let allPlayers = []
         if (querySnapshot.docs.length > 0) {
            querySnapshot.docs.forEach(doc => {
               allPlayers.push(doc.data())
            })
            setPlayers(allPlayers)
            console.log(' '); console.log("Getting new players from DB:"); console.log(allPlayers);
         } else console.log('no players yet');
      })
  }, [gameId])


   // ᐧ CHECK IF ALL PLAYERS ARE READY (when state is updated)
   useEffect(() => {
      if (playerIsHost) {
         // TO DO: replace with 'if all players in firebase ready = true'
         if (testAllPlayersReady){
            hostNextGamePhase()
            return
   }}}, [testAllPlayersReady]);
   // TO DO:  replace ^ 'testAllPlayersReady' with something that checks firebase for any user being ready, or any change to game obj

   return (
      <div>
         <div className="container">
            <div className="inner">
               <h5>Game</h5>
            </div>
         </div>

         {phaseTable[phase].component}

         <div className="container">
            <div className="inner">
               <h5>🪛 TEST PANNEL</h5>
               <button onClick={() => {handleSubmitOrTimeout()
                                       setTestAllPlayersReady(true)}}> Set all players to ready </button>
               <button onClick={() => {handleSubmitOrTimeout()}}> Set me to ready </button>
               <p>Game id is {gameId}</p>
               <p>Current phase: {phase}</p>
               <p>Round: {roundCounter} / {rules.gameLength} </p>
               <p>Player is host: { playerIsHost ? "✅" : "❌"}</p>
               <p>Current player ready: { playerIsReady ? "✅" : "❌"}</p>
               <p>All players ready: { testAllPlayersReady ? "✅" : "❌" }</p>
            </div>
         </div>
      </div>
   );
 }

 export default Game;
