function VoteSentence(props) {

  console.log(props.chooseFrom)

  function handleClick(data) {
    console.log(data);
    // hold off submiting to data now, might show up on other peopels stories
    // instead, lets copy this option, then delete all other options 
    // next screen will just be the same setup as this one pretty much. 
    // Then on that screen we move it on to the story 
    props.submitTo(data)

    props.onCompletion()
  }

   return (
      <div className="voteSentence container">
         <div className="inner">
          <h4>Showing: VoteSentence</h4>
          { props.chooseFrom.map( (sentence) =>  
             <button onClick={() => {handleClick(sentence)}} > {sentence.text} </button>
         )}
        </div>
      </div>
      );
    }

export default VoteSentence;