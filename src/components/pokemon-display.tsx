import { GameState } from "../hooks/use-game-manager";
import type { Pokemon } from "../types/pokemon.interface";

interface Props {
    pokemon: Pokemon | null;
    isLoading: boolean;
    gameState: GameState;
}

const PokemonDisplay = ({ pokemon, isLoading, gameState }: Props) => {
    const showAnswer = gameState !== GameState.Playing;
    const image = pokemon?.image;
    const name = pokemon?.name ?? "";
    const formattedName = name.toUpperCase();

    return (
        <article className={`pokemon-card ${showAnswer ? "pokemon-card--revealed" : ""}`}>
            <header className="pokemon-card__header">
                <span className="pokemon-card__tag">{showAnswer ? "¡Respuesta!" : "Reto"}</span>
                <h2 className="pokemon-card__title">
                    {showAnswer ? formattedName : "¿Quién es ese Pokémon?"}
                </h2>
            </header>

            <div className="pokemon-card__body">
                {isLoading ? (
                    <div className="pokemon-card__loader" role="status" aria-live="assertive" aria-label="Cargando Pokémon" />
                ) : (
                    image && (
                        <img
                            src={image}
                            alt={showAnswer ? `Imagen oficial de ${formattedName}` : "Silueta de un Pokémon"}
                            className={`pokemon-card__image ${showAnswer ? "" : "pokemon-card__image--hidden"}`}
                            loading="lazy"
                        />
                    )
                )}
            </div>
        </article>
    );
};

export default PokemonDisplay;
