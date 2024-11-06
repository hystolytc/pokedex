import { z } from "zod";

const pokemonAbility = z.object({
  ability: z.object({
    name: z.string(),
  }),
  is_hidden: z.boolean(),
  slot: z.number()
})

export const pokemonSchema = z.object({
  id: z.number(),
  name: z.string(),
  abilities: z.array(pokemonAbility),
  sprites: z.record(z.string(), z.any())
});

export const pokemonListSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  results: z.array(z.object({
    name: z.string(),
    url: z.string()
  })),
});