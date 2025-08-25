import { useState } from "react";
import { GameState } from "../hooks/use-game-manager";

interface PokemonFormProps {
    handlePokemon: (pokemonName: string) => void;
    gameState: GameState;
}

const PokemonForm = ({handlePokemon,gameState}:PokemonFormProps) => {

    const [inputValue, setInputValue] = useState("");
    

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim()) {
            console.log(`Input value submitted: ${inputValue.trim()}`);
            
        }
        
        handlePokemon(inputValue.trim());
       setInputValue(""); // Limpiar el campo de entrada después de enviar
    }

    

  return (
   
       
                <form onSubmit={handleSubmit} className="input-group mb-3">
                    <input 
                    type="text" 
                    className="form-control" 
                    placeholder='¿Quien es ese Pokémon?' 
                    aria-label="Recipient’s username" 
                    onChange={(e)=> setInputValue(e.target.value)} 
                    autoFocus 
                    disabled={gameState !== GameState.Playing}
                    value={inputValue}
                    />
                    
                    <button 
                    className="btn btn-outline-secondary" 
                    type="submit"
                    disabled={gameState !== GameState.Playing}
                  
                    >
                        Jugar
                    </button>
                </form>
           
        
   
  )
}

export default PokemonForm
