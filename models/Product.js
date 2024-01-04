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
    regularPrice: {
        type: Number,
        required: true
    },
    salePrice: {
        type: Number,
        required: true
    },
    product_images: [
        {
            type: String
        }
    ],
    tags: [
        {
            type: String
        }
    ],
    attributes: [
        {
            values: [
                {
                    type: String,
                },
            ],
            stock: { type: Number }
        }
    ],
    producthighlights: [
        {
            highlight:
            {
                type: String,
            },
            value: {
                type: String
            }
        }
    ]
}, {
    timestamps: true,
});

const Product = models.Product || model('Product', ProductSchema);

export default Product;
