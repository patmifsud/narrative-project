import React from 'react';
import Sentence from './Sentence';

function Story(props) {
   return (

      <div className="container noBg">
         <div className="inner">
            <div className="story">
               {props.story.map( sentence =>  
               <Sentence content={sentence}/>
               )}
            </div>
         </div>
      </div>
      );
    }

export default Story;