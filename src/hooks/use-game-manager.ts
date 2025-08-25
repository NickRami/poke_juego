import {useCallback, useEffect, useState } from "react";
import { PokemonService } from "../services/pokemon.service";
import type { Pokemon } from "../types/pokemon.interface";


export const GameState = {
    Playing : "playing",
    Correct: "correct",
    Wrong : 'wrong',
} as const;

export type GameState = typeof GameState[keyof typeof GameState];


export const useGameManager = () => {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
   const [gameState, setGameStatus] = useState<GameState>( GameState.Playing); 

    const handlePokemonNameSubmit = useCallback((inputName: string) => {
        if (!pokemon) return;
        
        const isCorrect = PokemonService.isPokemonNameCorrect(inputName, pokemon.name);
        setGameStatus(isCorrect ? GameState.Correct : GameState.Wrong);
        
        if (isCorrect) {
            setGameStatus(GameState.Correct);
            console.log('¡Correcto!');
        } else {
            setGameStatus(GameState.Wrong);
            console.log('¡Incorrecto!');
        }
    }, [pokemon]);


    const loadNewPokemon = useCallback(async () => { 
        setIsLoading(true);
        setError(null);
        setGameStatus(GameState.Playing);
        try {
            const newPokemon = await PokemonService.getramdomPokemon();
            setPokemon(newPokemon);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error fetching Pokémon');
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