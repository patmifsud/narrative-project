import { useHistory } from "react-router-dom";
import { db } from '../services/firebase'
import firebase from 'firebase'


function Home() {
   const history = useHistory();


  // function signInWithGoogle(){
  //   const provider = new firebase.auth.GoogleAuthProvider()
  //   auth.signInWithPopup(provider)
  // }

   function _startButtonHandler(){
      // show loading icon on start button

      // check if the user is logged in
      //
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
        players: [{uid:1 , name: "Theo", score: 0, isArbitrator: false, ready: false, isHost: true }],
        sentences: [{ text: "Pizza", uid: 1, round: 1 }],
        story: [{ text: "1st Text", uid: 1, round: 1 }],
        phase: 'Intro',
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
   }

  return (
    <div className="App container">
      <div className="inner">
         <h1>Home</h1>
         <button onClick={_startButtonHandler}> Create a game </button>
      </div>
    </div>
  );
}

export default Home;
