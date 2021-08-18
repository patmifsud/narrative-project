import React, { useState, useEffect } from 'react';
import { useLocation, Redirect } from 'react-router';
import { db, auth } from '../services/firebase'
import firestore from 'firebase/app'

import {rules} from '../helpers/rules.js';
import {Intro, Lobby, WriteSentence, VoteSentence, RevealSentence, RevealScore, RevealFinalScore} from "./gamePhases/allPhases";


function Game() {
   //--------------------------
   // STATES
      const [phase, setPhase] = useState('Lobby')
      const [players, setPlayers] = useState([])
      const [player, setPlayer] = useState({name: "Theo", score: 0, isArbitrator: false, ready: false, isHost: true, id:0})

      // Temporary or may be moved elsewhere
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
      'WriteSentence': {'component': <WriteSentence story={story} submitTo={setSentences} onCompletion={handleSubmitOrTimeout} player={player}/>, 'next': 'VoteSentence' },
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
   // 🔥 FIREBASE GET - AUTO UPDATE COMPONENT STATES when db changes:
   useEffect(() => {

      // 📅 🔥 update 'phase' in game state when 'phase' changes in db
      db.collection('games').doc(gameId).onSnapshot(snapshot => {
         setPhase(snapshot.data().phase)
      })

      // 📖 🔥 update 'story' in game state when 'story' changes in db
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

      // 👤 🔥 update 'player' data in game state when 'player' changes in db
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


   //--------------------------
   // 🔥 FIREBASE POST FUNCTIONS
   const dbCollectionGame = db.collection("games").doc(gameId)
   const dbCollectionPlayers = db.collection("games").doc(gameId).collection('players')

   function dbSetThisPlayerReadyTo(bool){
      const playerId = (player.id).toString()
      dbCollectionPlayers.doc(playerId).update({'ready': bool})
   }

   function dbSetAllPlayersReadyTo(bool){
      for (let i = 0; i < players.length; i++) {
         const playerId = (player.id).toString()
         dbCollectionPlayers.doc(playerId).update({'ready': bool})
      } 
   }

   function dbSetPhaseTo(phaseParam){
      dbCollectionGame.update({'phase' : phaseParam})
   }

   function dbSetRoundCounterTo(roundNo){
      //will do later
   }

   function dbCyclePlayerRoles(){
      //will do later
   }

   // MOVE TO NEXT PHASE 
   // when players state changes (pulled from db) check if all are ready. 
   // If admin && if ready set db to next phase
   useEffect(() => {
      if (player.isHost) {
         console.log(checkIfAllPlayersReady())

         if (checkIfAllPlayersReady()){
            hostNextGamePhase()
            return
   }}}, [players]);



   //--------------------------
   // FUNCTIONS: GAME PLAY

   function handleSubmitOrTimeout(){
      dbSetThisPlayerReadyTo(true);
   }

   function checkIfAllPlayersReady(){
      for (let i = 0; i < players.length; i++) {
       if (players[i].ready != true) return false
      } 
      return true
   }

   function hostNextGamePhase() {
      console.log("looks like everyones ready, so setting the game phase to:" + phaseTable[phase].next)
      dbSetAllPlayersReadyTo(false);
      dbSetPhaseTo(phaseTable[phase].next);

      if (phase === 'RevealScore'){
         // get these two working with the DB
         dbSetRoundCounterTo(roundCounter + 1)
         dbCyclePlayerRoles();

         if (roundCounter >= rules.gameLength){
            setPhase('RevealFinalScore');
            return
         }
      }
   }


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
               <button onClick={() => {dbSetAllPlayersReadyTo(true)}}> Set all players to ready </button>
               <button onClick={() => {handleSubmitOrTimeout()}}> Set me to ready </button>
               <button onClick={() => {setPlayers([... players, {name: "June", score: 0, isArbitrator: false, ready: false, isHost: false, id:1} ])}}> Add player 2 </button>
               <button onClick={() => {setPlayers([... players, {name: "Mark", score: 0, isArbitrator: false, ready: false, isHost: false, id:2} ])}}> Add player 3 </button>
               <p>Game id is {gameId}</p>
               <p>Current phase: {phase}</p>
               <p>Round: {roundCounter} / {rules.gameLength} </p>
               <p>Current player ready: { playerIsReady ? "✅" : "❌"}</p>
               <p>All players ready: { testAllPlayersReady ? "✅" : "❌" }</p>
            </div>
         </div>
      </div>
   );
 }

 export default Game;
