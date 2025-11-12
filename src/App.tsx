import ReactConfetti from "react-confetti";
import { useWindowSize } from "react-use";
import PokemonDisplay from "./components/pokemon-display";
import PokemonForm from "./components/pokemon-form";
import PokemonResult from "./components/pokemon-result";
import { GameState, useGameManager } from "./hooks/use-game-manager";

const App = () => {
    const { width, height } = useWindowSize();
    const { loadNewPokemon, error, isLoading, pokemon, handlePokemonNameSubmit, gameState } = useGameManager();

    const shouldShowConfetti = gameState === GameState.Correct;

    return (
        <div className="app-shell">
            {shouldShowConfetti && (
                <ReactConfetti width={width} height={height} numberOfPieces={240} recycle={false} />
            )}

            <main className="app-shell__content">
                <header className="app-header">
                    <h1 className="app-header__title">PokéTrivia</h1>
                    <p className="app-header__subtitle">
                        Adivina el Pokémon escondido detrás de la silueta y pon a prueba tus conocimientos.
                    </p>
                </header>

                <section className="app-panel" aria-live="polite">
                    {error && (
                        <div className="app-alert app-alert--error" role="alert">
                            <span>{error}</span>
                            <button type="button" className="app-alert__action" onClick={loadNewPokemon}>
                                Intentar nuevamente
                            </button>
                        </div>
                    )}

                    <PokemonDisplay pokemon={pokemon} isLoading={isLoading} gameState={gameState} />
                    <PokemonForm handlePokemon={handlePokemonNameSubmit} gameState={gameState} />
                    <PokemonResult loadNewPokemon={loadNewPokemon} gameState={gameState} />
                </section>
            </main>
        </div>
    );
};

export default App;
