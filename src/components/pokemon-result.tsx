import { GameState, } from "../hooks/use-game-manager";
interface Props {
    loadNewPokemon: () => void;
    gameState: GameState;
}


const PokemonResult = ({loadNewPokemon,gameState}:Props) => {

        if (gameState === GameState.Playing) {
            return null; // No mostrar nada si el juego está en estado "Playing"
        }


  return ( 
        <div >
            <div className= {
                `alert ${gameState === GameState.Correct ? 'alert-success' : gameState === GameState.Wrong ? 'alert-danger' : 'd-none'} text-center`

              

            }>
                
                {gameState === GameState.Correct ? '¡Correcto!' : gameState === GameState.Wrong ? '¡Incorrecto!' : ''}
                <br />
               

               <button 
               className="btn btn-primary mt-2"
                onClick={loadNewPokemon}
                >
                    Cargar nuevo Pokémon
                </button>
               
            </div>
           
        </div>
  )
}

export default PokemonResult
