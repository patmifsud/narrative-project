import React, { useState } from 'react';

function SentenceInputForm(props) {

   // only way to prevent default is to have a local funciton from what i can see
   function handleSubmitLocal(event){
      event.preventDefault();
      props.onSubmit();
   }

   return ( 
         <div className="container noBg">
            <div className="inner">
               <form onSubmit={handleSubmitLocal}>
                  <textarea name="sentence" onChange={(e) => props.onChange(e.target.value)}
                     placeholder="What happens next?" />
                  <input type="submit" value="Submit" />
               </form>
            </div>
         </div>
      );
    }

export default SentenceInputForm;