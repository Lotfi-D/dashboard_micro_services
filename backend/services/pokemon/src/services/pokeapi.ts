const BASE = "https://pokeapi.co/api/v2";

export async function fetchPokemonList(limit: number, offset: number): Promise<any> {
  const res = await fetch(`${BASE}/pokemon?limit=${limit}&offset=${offset}`);
  if (!res.ok) throw new Error(`PokeAPI error ${res.status}`);
  return res.json();
}

export async function fetchPokemon(idOrName: string): Promise<any | null> {
  const res = await fetch(`${BASE}/pokemon/${encodeURIComponent(idOrName)}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`PokeAPI error ${res.status}`);
  return res.json();
}

export interface GenerationResponse {
  pokemon_species: Array<{ name: string; url: string }>;
}

export async function fetchGeneration(gen: string): Promise<GenerationResponse | null> {
  const res = await fetch(`${BASE}/generation/${encodeURIComponent(gen)}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`PokeAPI error ${res.status}`);
  return res.json() as Promise<GenerationResponse>;
}
