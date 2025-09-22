import { Schema, model } from "mongoose";

const todoSchema = new Schema(
  {
    title: { 
      type: String, 
      required: true 
    },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
  // add user id after
);

export const Todo = model("Todo", todoSchema);
