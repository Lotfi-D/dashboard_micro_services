import { Router } from "express";
import { listPokemon, getPokemon, listByGeneration } from "../controllers/pokemon.controller";

const router = Router();

router.get("/pokemon", listPokemon);
router.get("/pokemon/:idOrName", getPokemon);
router.get("/pokemon/generation/:gen", listByGeneration)

export default router;
