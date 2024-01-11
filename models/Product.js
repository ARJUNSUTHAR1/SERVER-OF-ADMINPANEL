import mongoose from "mongoose";

const { model, models, Schema } = mongoose;

const ProductSchema = new Schema({
  productName: {
    type: String,
    required: true,
  },
  mainDescription: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },

  main_category: {
    type: String,
    required: true,
  },

  sub_category: {
    type: String,
    required: true,
  },

  sub_sub_category: {
    type: String,
    required: true,
  },


  regularPrice: {
    type: Number,
    required: true,
  },
  salePrice: {
    type: Number,
    required: true,
  },
  product_images: [
    {
      color: { type: String, },
      src: { type: String, }
    },
  ],
  tags: [
    {
      type: String,
    },
  ],
  attributes: [
    [
      {
        name: {
          type: String,
        },
        values: [
          {
            type: String,
          },
        ],
        stock: {
          type: String, // or Number, depending on your requirements
        },
      },
    ],
  ],
  producthighlights: [
    {
      highlight: {
        type: String,
      },
      value: {
        type: String,
      },
    },
  ],
}, {
  timestamps: true,
});

const Product = models.Product || model('Product', ProductSchema);

export default Product;
