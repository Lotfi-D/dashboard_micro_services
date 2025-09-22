import { Request, Response } from "express";
import { fetchPokemonList, fetchPokemon, fetchGeneration } from "../services/pokeapi";

export async function listPokemon(req: Request, res: Response) {
  const limit = Math.min(Math.max(parseInt(String(req.query.limit ?? 20), 10) || 20, 1), 200);
  const offset = Math.max(parseInt(String(req.query.offset ?? 0), 10) || 0, 0);

  try {
    const data = await fetchPokemonList(limit, offset);
    return res.json(data);

  } catch (err) {

    console.error(err);
    return res.status(502).json({ error: "Upstream error" });
  }
}

export async function getPokemon(req: Request<{ idOrName: string }>, res: Response) {
  try {
    const pokemon = await fetchPokemon(req.params.idOrName);

    if (!pokemon) {
      return res.status(404).json({ error: "Pokémon not found" });
    }
    return res.json(pokemon);
  
  } catch (err) {
    console.error(err);
    return res.status(502).json({ error: "Upstream error" });
  }
}

function parsePokemonSpeciesIdFromUrl(url: string): number {
  const match = url.match(/\/pokemon-species\/(\d+)\/?$/);
  return match ? Number(match[1]) : NaN;
}

export async function listByGeneration(req: Request<{ gen: string }>, res: Response) {
  const limitInput = req.query.limit as string | undefined;
  const offsetInput = req.query.offset as string | undefined;

  const limitValue = Number(limitInput ?? 100);
  const offsetValue = Number(offsetInput ?? 0);

  const limit = Math.min(Math.max(Number.isNaN(limitValue) ? 100 : limitValue, 1), 200);
  const offset = Math.max(Number.isNaN(offsetValue) ? 0 : offsetValue, 0);

  try {
    const generation = await fetchGeneration(req.params.gen);
    if (!generation) {
      return res.status(404).json({ error: "Generation not found" });
    }

    const generationName = (generation as any).name ?? null;
    const generationId = (generation as any).id ?? null;
    const regionName = (generation as any).main_region?.name ?? null;

    const pokemonWithIds = generation.pokemon_species
      .map(species => ({
        id: parsePokemonSpeciesIdFromUrl(species.url),
        name: species.name,
        url: species.url,
      }))
      .filter(pokemon => Number.isFinite(pokemon.id))
      .sort((a, b) => a.id - b.id);

    const total = pokemonWithIds.length;
    const paginated = pokemonWithIds.slice(offset, offset + limit);

    return res.json({
      generation: { id: generationId, name: generationName, region: regionName },
      count: total,
      limit,
      offset,
      pokemon: paginated
    });
  } catch (error) {
    console.error("[listByGeneration] upstream error:", error);
    return res.status(502).json({ error: "Upstream error" });
  }
}