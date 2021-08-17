import React from 'react';
import Sentence from './Sentence';

function Story(props) {

   return (
      <div className="story">
         {props.story.map( sentence =>  
           <Sentence content={sentence}/>
         )}
      </div>
      );
    }

export default Story;