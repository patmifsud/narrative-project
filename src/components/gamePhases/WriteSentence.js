import React, { useState} from 'react';
// import Sentence from '..../helpers/globals.js';
import SentenceInputForm from '../ui/SentenceInputForm'; 
import Story from '../ui/Story'; 

function WriteSentence(props) {
  const [localSentence, setLocalSentence] = useState('')

  function handleTextEntry(text){
    setLocalSentence(text)
  }

  // send submition from child SentenceInputForm to 'Sentences' in db
  function handleSubmit(){
    console.log(localSentence)
    props.submitTo({
      'text': localSentence, 
      'userid': props.player.id, 
      'username': props.player.name })
    props.onCompletion();
  };
  
  return (
    <div className="writeSentence container">
      <h4>WriteSentence</h4>
        <div className="inner">
        <Story story={props.story}/>
        <SentenceInputForm 
          onChange={handleTextEntry}
          onSubmit={handleSubmit}/>
      </div>
    </div>
    );
  }

export default WriteSentence;