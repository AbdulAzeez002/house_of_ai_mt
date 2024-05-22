import mongoose, { Schema, Document, Mongoose } from "mongoose";

interface ITodo extends Document {
  name: string;
  email: string;
  password: string;
}

const todoSchema: Schema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

export default mongoose.model<ITodo>("Todo", todoSchema);
