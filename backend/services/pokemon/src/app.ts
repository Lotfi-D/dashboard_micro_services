import express from "express";
import pokemonRoutes from "./routes/pokemon.routes";

const app = express();
app.use(express.json());

app.use(pokemonRoutes);

app.get("/health", (_req, res) => res.json({ ok: true, service: "pokemon" }));

export default app;
