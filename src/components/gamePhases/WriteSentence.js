import React, { useState, useEffect } from 'react';
// import Sentence from '..../helpers/globals.js';
import SentenceInputForm from '../ui/SentenceInputForm'; 
import Story from '../ui/Story'; 

function WriteSentence(props) {
  const [localSentence, setLocalSentence] = useState('')

  console.log(props.story)


  function handleTextEntry(e){
    console.log('handleTextEntry called')
    console.log('e is equal to ' + e.value)

  }

  const handleSubmit = (props) => {
    console.log('handlesubmit called')
    props.submitTo()
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