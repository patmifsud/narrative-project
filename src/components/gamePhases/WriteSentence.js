import React, { useState} from 'react';
// import Sentence from '..../helpers/globals.js';
import SentenceInputForm from '../ui/SentenceInputForm'; 
import Story from '../ui/Story'; 

function WriteSentence(props) {
  const [localSentence, setLocalSentence] = useState('')
  console.log("props 2:");
  console.log(props);

  function handleTextEntry(e){

  }

  // send submition from child SentenceInputForm to 'Sentences' in db
  function handleSubmit(content){
    props.submitTo({
      'text': content, 
      'uid': props.player.id, 
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