import mongoose from "mongoose";

const { model, models, Schema } = mongoose;

const CategorySchema = new Schema({

  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  parentCategory: {
    type: Schema.Types.ObjectId,
    ref: "TotalCategory",
    default: null,
  },
  isVisible: {
    type: Boolean,
    default: true,
  },
  mainImage: {
    type: String,
    required: true,
  },
  hoverImage: {
    type: String,
    required: true,
  },


}, {
  timestamps: true,
});

const Category = models?.Category || model('TotalCategory', CategorySchema);
export default Category;