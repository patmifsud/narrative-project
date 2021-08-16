import { useHistory } from "react-router-dom";



function Home() {
   const history = useHistory();

   function _startButtonHandler(){
      // show loading icon on start button
         let gameCode= generateGameCode()
      // try to create a game in db with id of 'gameCode'
      // if db returns success, do the following:
         history.push(`/play/${gameCode}`);
      //if not, error message
   }

   function generateGameCode() {
      // 5 digits. todo: duplicate testing/ prevention
      return Math.random().toString(36).substr(2, 5);
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
