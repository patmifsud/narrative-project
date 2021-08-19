function Lobby(props) {

   return (

         //   useEffect(() => {
         // props.players[props.player]
         //     if (props.player.isHost) {
         //  }}, []);

         // Params
         // onCompletion={handleSubmitOrTimeout} players={players}  postition={player}

      <div className="lobby phase">
         <div className="inner">
          <h4>Lobby</h4>
          <p>Players:</p>
         {/* props.players[props.player] */}
         {/* name: "Theo", score: 0, isArbitrator: false, ready: false, isHost: true, id:0 */}
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