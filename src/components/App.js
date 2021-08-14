import Game from './Game';
import Home from './Home';

import React, { useState } from 'react';

import { Route, BrowserRouter as Router, Link, Switch } from "react-router-dom";


import Nav from './ui/Nav';


// firebase config, can move to services
// const firebaseConfig = {
//   apiKey: "AIzaSyAiCtqO51t7aHNQnuyjDCpkmE5ZQzBGXnY",
//   authDomain: "narrative-project-ga.firebaseapp.com",
//   projectId: "narrative-project-ga",
//   storageBucket: "narrative-project-ga.appspot.com",
//   messagingSenderId: "65713869023",
//   appId: "1:65713869023:web:bb8260cfe93a2f5a48996a",
//   measurementId: "G-K7F0H8GX21"
// };

// firebase.initializeApp(firebaseConfig);


function App() {
  // const [location, setCount] = useState(0);

  return (
    <div className="App">
      <Nav />

      <Router>
            <Link to="/" >Home</Link>
            <Link to="/play" >Game</Link>
        <Switch>
          
            <Route path="/play" component={Game} />
            <Home path="/" exact component={Home}/>

          </Switch>
      </Router>
    </div>
  );
}

export default App;
