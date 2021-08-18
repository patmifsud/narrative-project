import React, { useState } from 'react';

function SentenceInputForm(props) {
   console.log('props')
   console.log(props)
   const [input, setInput] = useState(' ')

   // only way to prevent default is to have a local funciton from what i can see
   function handleSubmitLocal(event){
      event.preventDefault();
      props.onSubmit(input);
   }



   function handleChange(event) {
      setInput(event.target.value);
   }

   return ( 
         <div className=" ">
            <form onSubmit={handleSubmitLocal}>
               <textarea name="sentence" onChange={handleChange} value={input} placeholder="What happens next?" />
               <input type="submit" value="Submit!" />
            </form>
         </div>
      );
    }

export default SentenceInputForm;