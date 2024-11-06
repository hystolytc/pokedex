import { z } from "zod";
import { makeApi, Zodios } from "@zodios/core";
import { pokemonListSchema, pokemonSchema } from "@/schemas/pokemon";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL || ''

const api = makeApi([
  {
    method: "get",
    path: "/pokemon",
    alias: "getPokemonList",
    response: pokemonListSchema,
    description: "Fetch a list of Pokémon",
    parameters: [
      { name: "limit", type: "Query", schema: z.number() },
      { name: "offset", type: "Query", schema: z.number() }
    ],
  },
  {
    method: "get",
    path: "/pokemon/:id",
    alias: "getPokemonById",
    response: pokemonSchema,
    description: "Fetch pokemon by id",
    parameters: [
      { name: "id", type: "Path", schema: z.string() }
    ],
  }
])

export const httpClient = new Zodios(BASE_URL, api)
