import { pokemonStorage } from "@/services/pokemonStorage";
import { pokemon } from "@/types/pokemon";
import { createContext, useContext, useState } from "react";

type ActionType = {
  setPokemon: (pokemon: pokemon) => void
  removePokemon: (id: number) => void
  isPokemonExist: (id: number) => boolean
}

type DataType = {
  pokemons: pokemon[]
  actions: ActionType
}

const DataContext = createContext<DataType | undefined>(undefined)

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pokemons, setPokemons] = useState<pokemon[]>(pokemonStorage.getPokemons())

  const setPokemon = (pokemon: pokemon) => {
    pokemonStorage.setPokemon(pokemon)
    setPokemons(pokemonStorage.getPokemons())
  }

  const removePokemon = (id: number) => {
    pokemonStorage.removePokemon(id)
    setPokemons(pokemonStorage.getPokemons())
  }

  const isPokemonExist = (id: number) => {
    return pokemons.findIndex(pokemon => pokemon.id === id) > -1
  }

  return (
    <DataContext.Provider value={{ pokemons: pokemons, actions: { setPokemon, removePokemon, isPokemonExist } }}>
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => {
  const context = useContext(DataContext)
  if (!context) throw new Error('DataContext not found.')
  return context
}