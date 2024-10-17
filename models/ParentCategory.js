import mongoose from "mongoose";

const { model, models, Schema } = mongoose;

const ParentCategorySchema = new Schema({
  name: { type: String, required: true },
}, {
  timestamps: true,
});

const ParentCategory = models?.ParentCategory || model('ParentCategory', ParentCategorySchema);
export default ParentCategory;