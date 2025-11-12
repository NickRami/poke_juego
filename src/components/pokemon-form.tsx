import { useState } from "react";
import type { FormEvent } from "react";
import { GameState } from "../hooks/use-game-manager";

interface PokemonFormProps {
    handlePokemon: (pokemonName: string) => void;
    gameState: GameState;
}

const PokemonForm = ({ handlePokemon, gameState }: PokemonFormProps) => {
    const [inputValue, setInputValue] = useState("");
    const isInteractionDisabled = gameState !== GameState.Playing;

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const normalizedValue = inputValue.trim();
        if (!normalizedValue) {
            return;
        }

        handlePokemon(normalizedValue);
        setInputValue("");
    };

    return (
        <form onSubmit={handleSubmit} className="guess-form">
            <label htmlFor="pokemonGuess" className="guess-form__label">
                Ingresa tu respuesta
            </label>

            <div className="guess-form__controls">
                <input
                    id="pokemonGuess"
                    type="text"
                    className="guess-form__input"
                    placeholder="Ejemplo: pikachu"
                    aria-describedby="guess-helper"
                    onChange={(event) => setInputValue(event.target.value)}
                    autoFocus
                    disabled={isInteractionDisabled}
                    value={inputValue}
                />
                <button type="submit" className="guess-form__button" disabled={isInteractionDisabled}>
                    Responder
                </button>
            </div>

            <p id="guess-helper" className="guess-form__helper">
                Escribe el nombre sin tildes. Se aceptan respuestas en español o inglés.
            </p>
        </form>
    );
};

export default PokemonForm;