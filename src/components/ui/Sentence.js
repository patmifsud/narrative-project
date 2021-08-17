function Sentence(props) {

   console.log(props.content)

   return (
      <div className="sentence">
         <div className="username">{props.content.username}</div>
         {props.content.text}
      </div>
      );
    }

export default Sentence;