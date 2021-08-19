import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion"
import {PhaseBanner} from '../ui/gameUi'; 

// story={story}
// players={players}
// player={players[player]}
// winningSentence={winningSentence}

// dbCyclePlayerRoles={dbCyclePlayerRoles}
// dbSetRoundCounterTo={dbSetRoundCounterTo}
// dbSetWinningSentence={dbSetWinningSentence}
// dbAddStory={dbAddStory}
// clearSentences={dbClearSentances}
// handleSubmitOrTimeout={handleSubmitOrTimeout}


function RevealScore(props) {
  // const player = props.players[props.player]
  useEffect(() => {
    props.setReadyAfter(3000)
  }, []);

  let setDbAlready = false

  useEffect(() => {
    if (props.player === null){ return }
    // if the player is the host and hasn't already done this (isn't ready, which is the last action of this function)
    if (props.player.isHost && setDbAlready === false) {
      console.log(props.winningSentence)
      props.dbAddStory(props.winningSentence)
      props.dbCyclePlayerRoles()
      props.dbSetRoundCounterTo()
      props.dbSetWinningSentence(' ')
      props.clearSentences(' ')
      setDbAlready = true
    }
   }, [props.players]);

   return (
      <div className="revealScore phase">
        <PhaseBanner />
         <div className="inner">
           <ul>
              { props.players.map( (playerData) =>  
                  <li key={playerData.id}> {playerData.name} : {playerData.score} pts </li>
              )}
         </ul>
        </div>
      </div>
      );
    }

export default RevealScore;