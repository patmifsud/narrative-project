
function SentenceInputForm(props) {

   // only way to prevent default is to have a local funciton from what i can see
   function handleSubmitLocal(event){
      event.preventDefault();
      props.onSubmit();
   }

   return (
      <div className=" ">
         <form onSubmit={ handleSubmitLocal}>
            <textarea name="sentence" onChange={props.onChange} placeholder="What happens next?" />
            <input type="submit" value="Submit!" />
         </form>
      </div>
      );
    }

export default SentenceInputForm;