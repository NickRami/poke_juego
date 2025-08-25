import ReactConfetti from "react-confetti"
import PokemonDisplay from "./components/pokemon-display"
import PokemonForm from "./components/pokemon-form"
import PokemonResult from "./components/pokemon-result"
import { GameState, useGameManager } from "./hooks/use-game-manager"
import { useWindowSize } from "react-use"
const App = () => {

  const {
    loadNewPokemon, 
       error ,
     isLoading,
      pokemon,
      handlePokemonNameSubmit,
      gameState } = useGameManager()  ;

 
  if (error) {
    return <div className="text-center text-danger">Error: {error}</div>;
  }

  const { width, height } = useWindowSize() 
    
  return (
    <div className="container mx-auto mt-5">

      <div>
            {
                gameState === GameState.Correct  && (
                  <ReactConfetti 
                  width={width} 
                  height={height}
                  numberOfPieces={300}
                  recycle = {false}
                  />
            )}
      </div>

     <div className="row justify-content-center">
      <div className="col-md-6 ">
       
        <PokemonDisplay pokemon= {pokemon} isLoading = {isLoading} gameState={gameState} />
        <PokemonForm  handlePokemon= {handlePokemonNameSubmit} gameState={gameState} />
        <PokemonResult loadNewPokemon ={ loadNewPokemon} gameState={gameState} />
      </div>



     </div>
    </div>
  )
}

export default App
