function VoteSentence(props) {

  function handleClick(data) {
    props.dbSetWinningSentence(data)
    props.handleSubmitOrTimeout()
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