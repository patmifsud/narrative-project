import { useHistory } from "react-router-dom";
import { db } from '../services/firebase'
import { motion } from "framer-motion"
import firebase from 'firebase'


function Home() {
   const history = useHistory();

//   function signInWithGoogle(){
//     const provider = new firebase.auth.GoogleAuthProvider()
//     auth.signInWithPopup(provider)
//   }

   function _startButtonHandler(){
      // show loading icon on start button

      // check if the user is logged in
         // if not signInWithGoogle()

      // if they are logged in, 

         let gameCode= generateGameCode()
         createGame(gameCode)
      // try to create a game in db with id of 'gameCode'
      // if db returns success, do the following:
         history.push(`/play/${gameCode}`);
      //if not, error message
   }

   function generateGameCode() {
      return Math.random().toString(36).substr(2, 5);
   }

   async function createGame(gc) {
    // 5 digits. todo: duplicate testing/ prevention
    // const gc =  generateGameCode()
    // console.log('Game Code:', gc);

      await db.collection("games").doc(gc).set({
         // players: [{uid:1 ,  }],
         // sentences: [{ text: "Pizza", uid: 1, round: 1 }],
         // story: [{ text: "1st Text", uid: 1, round: 1 }],
         winningSentence: '',
         roundCounter: 1,
         phase: 'Lobby',
         createdAt: firebase.firestore.FieldValue.serverTimestamp()
      })

      // during create game if user is not signed in 
      // 




      //SEED DATA
      // later i think we can remove the .doc onwards to just create the collections
      // adding a story collection
      db.collection("games").doc(gc).collection('story').doc('0').set({
         text: "Once apon a time:", uid: 1, username: "frank", round: 1 
      })
      db.collection("games").doc(gc).collection('sentences').doc('0').set({
         text: "Once apon a time:", uid: 1, username: "frank", round: 1 
      })
      // hacky way to add first user
      db.collection("games").doc(gc).collection('players').doc('0').set({
         name: "Theo", score: 0, isArbitrator: false, ready: false, isHost: true, id:0})
   }

  return (
    <div className="App container">
      <div className="inner">
      <motion.div animate={{ scale: [0.1, 1] }} transition={{ duration: 1 }}>
         <h1>Home</h1>
         <button onClick={_startButtonHandler}> Create a game </button>
      </motion.div>
      </div>
    </div>
  );
}

export default Home;
