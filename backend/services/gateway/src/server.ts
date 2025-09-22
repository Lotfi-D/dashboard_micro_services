import "dotenv/config";
import app from "./app";

const PORT = Number(process.env.PORT ?? 4003);
app.listen(PORT, () => console.log(`[gateway] listening on :${PORT}`));