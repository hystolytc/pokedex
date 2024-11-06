import { httpClient } from "./base"

type filter = {
  limit: number
  offset: number
}

export const getAllPokemon = async (filter: filter) => {
  try {
    const data = await httpClient.get("/pokemon", { queries: filter })
    return data
  } catch (ex) {
    throw ex
  }
}

export const getPokemon = async (id: string) => {
  try {
    const data = await httpClient.get("/pokemon/:id", { params: { id } })
    return data
  } catch (ex) {
    throw ex
  }
}