import "dotenv/config";
import app from "./app";
import { connectDB } from "./utils/connectDB";

const PORT = Number(process.env.PORT ?? 4002);
const MONGO_URI = process.env.MONGO_URI ?? "mongodb://localhost:27018/todos";

(async () => {
  await connectDB(MONGO_URI);
  app.listen(PORT, () => console.log(`[todos] listening on :${PORT}`));
})();
