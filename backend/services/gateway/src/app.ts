import express from "express";
import cors from "cors";
import morgan from "morgan";
import { createProxyMiddleware } from "http-proxy-middleware";
import type { IncomingMessage, ServerResponse } from "http";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.get("/health", (_req, res) => res.json({ ok: true, service: "gateway" }));

function proxy(target: string) {
  return createProxyMiddleware({
    target,
    changeOrigin: true,
    proxyTimeout: 10000,
    onError: (_err: Error, _req: IncomingMessage, res: ServerResponse) => {
      res.statusCode = 502;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "Upstream unavailable" }));
    }
  } as any);
}


app.use("/apiusers", proxy(process.env.USERS_URL!));
app.use("/apitodo", proxy(process.env.TODOS_URL!));
app.use("/apipokemon", proxy(process.env.POKEMON_URL!));

export default app;
