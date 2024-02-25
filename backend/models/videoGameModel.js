import mongoose from "mongoose";

const videoGameSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    developer: {
      type: String,
      required: true,
    },
    releaseYear: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const videoGame = mongoose.model("Games", videoGameSchema);
