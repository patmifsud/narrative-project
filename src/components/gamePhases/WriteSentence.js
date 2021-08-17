import React, { useState, useEffect } from 'react';
// import Sentence from '..../helpers/globals.js';
import SentenceInputForm from '../ui/SentenceInputForm'; 
import Story from '../ui/Story'; 

function WriteSentence(props) {

  function handleTextEntry(){
    console.log('handleTextEntry called')
  }

  const handleSubmit = (props) => {
    console.log('handlesubmit called')
    props.onCompletion();
  };
  
  return (
    <div className="writeSentence container">
      <h4>WriteSentence</h4>
        <div className="inner">
        <Story content={props.story}/>
        <SentenceInputForm 
          onChange={handleTextEntry}
          onSubmit={handleSubmit}/>
      </div>
    </div>
    );
  }

export default WriteSentence;