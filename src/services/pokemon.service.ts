import type { Pokemon } from "../types/pokemon.interface";
import { getRandomNumber } from "../utils/ramdom-number";

const POKEMON_API_URL = 'https://pokeapi.co/api/v2/pokemon';
const POKEMON_LIMIT = 151;

     const getramdomPokemon = async (): Promise<Pokemon> => {
    const randomId = getRandomNumber(1, POKEMON_LIMIT);
    const response = await fetch(`${POKEMON_API_URL}/${randomId}`);
    
    if (!response.ok) {
        throw new Error('Error fetching Pokémon data');
    }
    const data = await response.json();
    return {
        id: data.id,    
        name: data.name,
        image: data.sprites.other['official-artwork'].front_default,
    };
} 

    const normalizeName = (name: string): string => {
        return name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
    };


    const isPokemonNameCorrect = (inputName: string, pokemonName: string): boolean => {
        return normalizeName(inputName) === normalizeName(pokemonName);
    }
  
export const PokemonService = {
    getramdomPokemon,
    isPokemonNameCorrect
};