import mongoose from "mongoose";

const { model, models, Schema } = mongoose;

const CategorySchema = new Schema({

  name: {
    type: String,
    required: true,
    unique: true,
  },
  subcategories: [
    {
      name: {
        type: String,
        required: true,
      },
      items: [
        {
          type: String,
          required: true,
        },
      ],
    },
  ],

}, {
  timestamps: true,
});

const Category = models?.Category || model('Category', CategorySchema);
export default Category;