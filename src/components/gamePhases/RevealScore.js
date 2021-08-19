import React, { useEffect } from 'react';
// import { motion } from "framer-motion"
import {PhaseBanner} from '../ui/gameUi'; 

let roundOfLastDbUpdate = 0



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
    if (!props.player.isHost){
      props.setReadyAfter(3000)
    }
  }, []);

  useEffect(() => {
    if (props.player === null){ return }
    console.log(props.roundCoutner)

    if (props.player.isHost && roundOfLastDbUpdate < props.roundCoutner){
      console.log('updating...')
          props.dbAddStory(props.winningSentence)
          props.dbCyclePlayerRoles()
          props.dbSetRoundCounterTo()
          props.dbSetWinningSentence(' ')
          props.clearSentences(' ')
          // roundOfLastDbUpdate = props.roundCoutner
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