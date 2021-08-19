import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { db } from '../services/firebase'
import { motion } from "framer-motion"
import firebase from 'firebase'


function Home() {
   const history = useHistory();
   const [buttonText, setButtonText] = useState('Create a game')


   function _startButtonHandler(){
      // show loading icon on start button

      // check if the user is logged in
         // if not signInWithGoogle()

      // if they are logged in, 

         let gameCode= generateGameCode()
         setButtonText('⏳')
         createGame(gameCode)
      // try to create a game in db with id of 'gameCode'
      // if db returns success, do the following:
      //if not, error message
   }

   function generateGameCode() {
      return Math.random().toString(36).substr(2, 5);
   }

   async function createGame(gameCode) {
    // 5 digits. todo: duplicate testing/ prevention
    // const gc =  generateGameCode()
    // console.log('Game Code:', gc);

      await db.collection("games").doc(gameCode).set({
         // players: [{postition:1 ,  }],
         // sentences: [{ text: "Pizza", postition: 1, round: 1 }],
         // story: [{ text: "1st Text", postition: 1, round: 1 }],
         winningSentence: '',
         roundCounter: 1,
         phase: 'Lobby',
         createdAt: firebase.firestore.FieldValue.serverTimestamp()
      })

      // during create game if user is not signed in 

      //SEED DATA
      // later i think we can remove the .doc onwards to just create the collections
      // adding a story collection
      await db.collection("games").doc(gameCode).collection('story').doc('0').set({
         text: "Once apon a time:", postition: 1, username: "frank", round: 1 
      })
      await db.collection("games").doc(gameCode).collection('sentences').doc('0').set({
         text: "Once apon a time:", postition: 1, username: "frank", round: 1 
      })
      // hacky way to add first user
      await db.collection("games").doc(gameCode).collection('players').doc('0').set({
         name: "Theo", score: 0, isArbitrator: false, ready: false, isHost: true, postition:0, playerId:0})

      // go to the url for the game. Moved this here so if (hopefully) only executes after fb db has finished
      history.push(`/play/${gameCode}`);
   }

  return (
   <div>
      <div className="home container largeCenteredText">
         <div className="inner">
         <motion.div animate={{ scale: [0.1, 1] }} transition={{ duration: 1 }}>
            <h1>Home</h1>
            <button onClick={_startButtonHandler}> {buttonText}</button>
         </motion.div>
         </div>
      </div>
   </div>
  );
}

export default Home;
