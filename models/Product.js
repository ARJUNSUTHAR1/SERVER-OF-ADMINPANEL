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
    {
      sku: {
        type: String,
        required: true,
      },
      stock: {
        type: String, // or Number, depending on your requirements
        required: true,
      },
      values: [
        {
          value: {
            type: String,
            required: true,
          },
        },
      ],
    },
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
  shipping: {
    dimensions: {
      length: {
        type: String, // or Number, depending on your requirements
      },
      width: {
        type: String, // or Number, depending on your requirements
      },
      height: {
        type: String, // or Number, depending on your requirements
      },
    },
    weight: {
      type: String, // or Number, depending on your requirements
    },
  },
}, {
  timestamps: true,
});

const Product = models.Product || model('Product', ProductSchema);

export default Product;
