import { GameState } from "../hooks/use-game-manager";
import type { Pokemon } from "../types/pokemon.interface";

interface Props {
    pokemon : Pokemon | null,
    isLoading: boolean;
    gameState: GameState
}

const PokemonDisplay = ({pokemon, isLoading,gameState}:Props) => {

    const showAnswer = gameState !== GameState.Playing;
    // Si el juego está en estado "Playing", no mostrar la respuesta
    const image = pokemon?.image;
    const name = pokemon?.name;

    console.log(name);
    
    


  return (
    <div className=" card mb-3">
        <div className="card-header">
            <h2 className="text-center">
                {
                showAnswer ? name?.toUpperCase() : '¿Quién es ese Pokémon?'
               }

            </h2>



        </div>
        <div className="card-body">
            <div className="text-center">
                {isLoading ? (
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                ) : (
                    image && <img src={image} style={
                        { width: "200px", height: "200px", filter: showAnswer ? "none" : 'brightness(0)' }
                    } alt={name} className="img-fluid" />
                )}
            </div>
         </div>   
    </div>
  )
}

export default PokemonDisplay
