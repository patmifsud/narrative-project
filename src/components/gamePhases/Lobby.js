function Lobby(props) {

   return (
      <div className="lobby container">
         <div className="inner">
          <h4>Lobby</h4>
          <p>Players:</p>
          <ul>
          { props.players.map( (playerData) =>  
             <li key={playerData.id}> {playerData.name} </li>
         )}
         </ul>
        </div>
      </div>
      );
    }

export default Lobby;