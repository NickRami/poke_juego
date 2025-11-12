import type { Pokemon } from "../types/pokemon.interface";
import { getRandomNumber } from "../utils/ramdom-number";

interface PokemonApiResponse {
    id: number;
    name: string;
    sprites: {
        front_default?: string | null;
        other?: {
            ["official-artwork"]?: {
                front_default?: string | null;
            };
        };
    };
}

const DEFAULT_BASE_URL = "https://pokeapi.co/api/v2";
const DEFAULT_RESOURCE = "pokemon";
const DEFAULT_LIMIT = 151;

const stripSlashes = (value: string) => value.replace(/^\/+|\/+$/g, "");

const getConfig = () => {
    const baseUrl =
        typeof import.meta.env.VITE_POKEAPI_BASE_URL === "string" && import.meta.env.VITE_POKEAPI_BASE_URL.trim().length > 0
            ? import.meta.env.VITE_POKEAPI_BASE_URL.trim().replace(/\/+$/, "")
            : DEFAULT_BASE_URL;

    const resource =
        typeof import.meta.env.VITE_POKEAPI_POKEMON_RESOURCE === "string" && import.meta.env.VITE_POKEAPI_POKEMON_RESOURCE.trim().length > 0
            ? stripSlashes(import.meta.env.VITE_POKEAPI_POKEMON_RESOURCE)
            : DEFAULT_RESOURCE;

    const limitFromEnv = Number(import.meta.env.VITE_POKEMON_POOL_LIMIT);
    const limit = Number.isFinite(limitFromEnv) && limitFromEnv > 0 ? Math.floor(limitFromEnv) : DEFAULT_LIMIT;

    return {
        pokemonEndpoint: `${baseUrl}/${resource}`,
        limit,
    };
};

const getRandomPokemon = async (): Promise<Pokemon> => {
    const { pokemonEndpoint, limit } = getConfig();
    const randomId = getRandomNumber(1, limit);
    const response = await fetch(`${pokemonEndpoint}/${randomId}`);

    if (!response.ok) {
        throw new Error("No se pudo obtener la información del Pokémon");
    }

    const responseClone = response.clone();
    const contentType = response.headers.get("content-type") ?? "";

    if (!contentType.includes("application/json")) {
        const payloadPreview = (await responseClone.text()).slice(0, 160);
        console.error("PokemonService: respuesta inesperada", payloadPreview);
        throw new Error("La API respondió con un formato inesperado. Intenta nuevamente en unos segundos.");
    }

    let data: PokemonApiResponse;

    try {
        data = (await response.json()) as PokemonApiResponse;
    } catch (error) {
        const payloadPreview = (await responseClone.text()).slice(0, 160);
        console.error("PokemonService: error al parsear la respuesta", payloadPreview, error);
        throw new Error("No se pudo interpretar la respuesta de la API de Pokémon.");
    }

    return {
        id: data.id,
        name: data.name,
        image:
            data.sprites?.other?.["official-artwork"]?.front_default ??
            data.sprites?.front_default ??
            "",
    };
};

const normalizeName = (name: string): string => {
    return name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
};

const isPokemonNameCorrect = (inputName: string, pokemonName: string): boolean => {
    return normalizeName(inputName) === normalizeName(pokemonName);
};

export const PokemonService = {
    getRandomPokemon,
    isPokemonNameCorrect,
};