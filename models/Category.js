import mongoose from "mongoose";

const { model, models, Schema } = mongoose;

const CategorySchema = new Schema({
  name: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
}, {
  timestamps: true,
});

const Category = models?.Category || model('Category', CategorySchema);
export default Category;