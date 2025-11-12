import { GameState } from "../hooks/use-game-manager";

interface Props {
    loadNewPokemon: () => void;
    gameState: GameState;
}

const PokemonResult = ({ loadNewPokemon, gameState }: Props) => {
    if (gameState === GameState.Playing) {
        return null;
    }

    const isCorrectAnswer = gameState === GameState.Correct;

    return (
        <div
            className={`result-banner ${isCorrectAnswer ? "result-banner--success" : "result-banner--error"}`}
            role="status"
            aria-live="polite"
        >
            <div className="result-banner__content">
                <h3 className="result-banner__title">{isCorrectAnswer ? "¡Correcto!" : "¡Incorrecto!"}</h3>
                <p className="result-banner__description">
                    {isCorrectAnswer
                        ? "Excelente memoria. ¿Quieres seguir jugando?"
                        : "No te preocupes, siempre puedes intentarlo una vez más."}
                </p>
            </div>

            <button type="button" className="result-banner__action" onClick={loadNewPokemon}>
                Probar con otro Pokémon
            </button>
        </div>
    );
};

export default PokemonResult;