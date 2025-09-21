import "dotenv/config";
import app from "./app";

const port = Number(process.env.PORT ?? 3001);
const server = app.listen(port, () => {
  console.log(`[users] listening on :${port}`);
});

// Arrêt propre (Ctrl+C, Kubernetes, etc.)
process.on("SIGTERM", () => server.close(() => process.exit(0)));
process.on("SIGINT",  () => server.close(() => process.exit(0)));
