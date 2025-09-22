import mongoose from "mongoose";

export async function connectDB(uri: string) {
  await mongoose.connect(uri);
  mongoose.connection.on("error", (error)=>console.error("[mongo]", error));
  console.log("[mongo] connected");
}
