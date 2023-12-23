import mongoose, { model, models, Schema } from "mongoose";

const CategorySchema = new Schema({
  name: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
}, {
  timestamps: true,
});

export const Category = models?.Category || model('Category', CategorySchema);