import mongoose, { Schema } from "mongoose";

const materialSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  technology: {
    type: String,
    required: true,
    trim: true,
  },
  colors: {
    type: [String],
    required: true,
    trim: true,
  },
  pricePerGram: {
    type: Number,
    required: true,
  },
  applicationTypes: {
    type: [String],
    required: true,
    trim: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

export const Material = mongoose.model("Material", materialSchema);
