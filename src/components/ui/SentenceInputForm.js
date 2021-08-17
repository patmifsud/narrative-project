
function SentenceInputForm(props) {

   // only way to prevent default is to have a local funciton from what i can see
   function handleSubmitLocal(event){
      event.preventDefault();
      props.onSubmit();
   }


//   _handleChange(event) {
//    this.setState({content: event.target.value});
//  }

//  render() {
//    return (
//      <form onSubmit={ this._handleSubmit }>
//        <textarea onChange={ this._handleChange } value={ this.state.content }></textarea>
//        <input type="submit" value="Tell" />
//      </form>
//    )
//  }

   return (
         <div className=" ">
            <form onSubmit={handleSubmitLocal}>
               <textarea name="sentence" onChange={props.onChange} placeholder="What happens next?" />
               <input type="submit" value="Submit!" />
            </form>
         </div>
      );
    }

export default SentenceInputForm;