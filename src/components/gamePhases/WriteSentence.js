import React, { useState, useEffect } from 'react';
import SentenceInputForm from '../ui/SentenceInputForm'; 


function WriteSentence(props) {

  function handleTextEntry(){
    console.log('handleTextEntry called')
  }

  const handleSubmit = () => {
    console.log('handlesubmit called')
    props.onCompletion();
  };
  
   return (
      <div className="writeSentence container">
         <div className="inner">
          <SentenceInputForm 
            onChange={handleTextEntry}
            onSubmit={handleSubmit}/>
        </div>
      </div>
      );
    }

export default WriteSentence;