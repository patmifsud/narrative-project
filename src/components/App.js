import Game from './Game';
import Home from './Home';
import React, { useState, useEffect } from 'react';

// React router dom
import { Route, BrowserRouter as Router, Link, Switch } from "react-router-dom";

// 🔥 🔥 🔥 TODO - get this all into services/firebase.js
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import {userAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAiCtqO51t7aHNQnuyjDCpkmE5ZQzBGXnY",
  authDomain: "narrative-project-ga.firebaseapp.com",
  projectId: "narrative-project-ga",
  storageBucket: "narrative-project-ga.appspot.com",
  messagingSenderId: "65713869023",
  appId: "1:65713869023:web:bb8260cfe93a2f5a48996a",
  measurementId: "G-K7F0H8GX21"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();
// 🔥 🔥 🔥 END TODO



function App() {

  // TODO - remove later. Test that firebase is working
  const testDbData = firestore.collection('testCollection');
  const [databaseContents] = useCollectionData(testDbData, {idField: 'id'});
  console.log(databaseContents)
  // END Test 

  return (
    <div className="App">
      <Router>

          {/* TODO - seperate nav component. Need to figure out links in child component */}
          <div className="container">
            <div className="inner">
              Nav:
              <Link to="/">Home </Link>|
              <Link to="/play"> Game </Link>
            </div>  
          </div>
          {/* END TODO  */}


        <Switch>
            {/* React dom routes. Slug is game id, read in game component */}
            <Route path="/play/:slug" component={Game}/>
            <Home path="/" exact component={Home}/>
        </Switch>

      </Router>

      {/* TODO - Remove, just a firebase test */}
      <div className="container">
        <div className="inner">
          <h3>List of data in the Db:</h3>
          <p>{ databaseContents && databaseContents.map( cont =>
               <li> {cont.name} </li> )}
          </p>
        </div>
      </div>
      {/* END TODO  */}

    </div>
  );
}

export default App;
