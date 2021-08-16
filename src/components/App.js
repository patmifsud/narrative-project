import Game from './Game';
import Home from './Home';
import React, { useState, useEffect } from 'react';
import { db } from "../services/firebase";
import {useCollectionData} from 'react-firebase-hooks/firestore';
import { Route, BrowserRouter as Router, Link, Switch } from "react-router-dom";


function App() {

  // TODO - remove later. Test that firebase is working
  const testDbData = db.collection('testCollection');
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
               <li key={cont.id}> {cont.name} </li> )}
          </p>
        </div>
      </div>
      {/* END TODO  */}

    </div>
  );
}

export default App;
