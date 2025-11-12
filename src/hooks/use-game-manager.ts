import { useCallback, useEffect, useState } from "react";
import { PokemonService } from "../services/pokemon.service";
import type { Pokemon } from "../types/pokemon.interface";

export const GameState = {
    Playing: "playing",
    Correct: "correct",
    Wrong: "wrong",
} as const;

export type GameState = (typeof GameState)[keyof typeof GameState];

export const useGameManager = () => {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [gameState, setGameStatus] = useState<GameState>(GameState.Playing);

    const handlePokemonNameSubmit = useCallback(
        (inputName: string) => {
            if (!pokemon) {
                return;
            }

            const isCorrect = PokemonService.isPokemonNameCorrect(inputName, pokemon.name);
            setGameStatus(isCorrect ? GameState.Correct : GameState.Wrong);
        },
        [pokemon],
    );

    const loadNewPokemon = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        setGameStatus(GameState.Playing);

        try {
            const newPokemon = await PokemonService.getRandomPokemon();
            setPokemon(newPokemon);
        } catch (err) {
            setError(err instanceof Error ? err.message : "No se pudo cargar el Pokémon");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadNewPokemon();
    }, [loadNewPokemon]);

    return {
        pokemon,
        isLoading,
        error,
        loadNewPokemon,
        handlePokemonNameSubmit,
        gameState,
    };
};