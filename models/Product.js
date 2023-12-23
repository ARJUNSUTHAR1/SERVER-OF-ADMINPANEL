import mongoose from "mongoose";

const { model, models, Schema } = mongoose;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please enter your product name!"],
    },
    description: {
        type: String,
        required: [true, "Please enter your product description!"],
    },
    category: {
        type: String,
        required: [true, "Please enter your product category!"],
        ref: 'Category'
    },
    originalPrice: {
        type: Number,
    },
    discountPrice: {
        type: Number,
        required: [true, "Please enter your product price!"],
    },
    stock: {
        type: Number,
        required: [true, "Please enter your product stock!"],
    },
    images: [{ type: String }],
    tags: [{ type: String }],
    attributes: [{ type: Object }],
    shopId: {
        type: String,
        required: true,
    },
    sold_out: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
}, {
    timestamps: true,
});

const Product = models.Product || model('Product', ProductSchema);

export default Product;
