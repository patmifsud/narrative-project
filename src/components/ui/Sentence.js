function Sentence(props) {

   console.log(props.content.postition)

   return (
      <div className={`sentence pl${props.content.postition}`}>
         <div className="username">{props.content.username}</div>
         {props.content.text}
      </div>
      );
    }



export default Sentence;