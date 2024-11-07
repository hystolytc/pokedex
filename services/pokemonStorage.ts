import { pokemon } from "@/types/pokemon"
import { MMKV } from 'react-native-mmkv'

const POKEMON_KEY = 'pokemons'

const storage = new MMKV()

const getPokemons = (): pokemon[] => {
  const pokemonsString = storage.getString(POKEMON_KEY) || ''
  if (!pokemonsString) return []
  return JSON.parse(pokemonsString)
}

const setPokemon = (pokemon: pokemon) => {
  const pokemons = getPokemons()
  pokemons.push(pokemon)
  storage.set(POKEMON_KEY, JSON.stringify(pokemons))
}

const removePokemon = (id: number) => {
  const pokemons = getPokemons()
  const updatedPokemons = pokemons.filter(pokemon => pokemon.id !== id)
  storage.set(POKEMON_KEY, JSON.stringify(updatedPokemons))
}


export const pokemonStorage = {
  getPokemons,
  setPokemon,
  removePokemon
}