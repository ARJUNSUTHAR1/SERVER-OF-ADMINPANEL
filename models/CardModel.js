import mongoose from "mongoose";

const { model, models, Schema } = mongoose;

const CardSchema = new Schema({
    mainHeading: {
        type: String,
        required: true
    },

    isVisible: {
        type: Boolean,
        required: true,
        default: true
    },

    productsData: [
        {
            unitProduct: {
                type: Schema.Types.ObjectId,
                ref : "Product",
            },
            isVisible: {
                type: Boolean,
                default: true
            }
        }
    ],

    createdAt: {
        type: Date,
        default: Date.now(),
    },
}, {
    timestamps: true,
});

const CardModel = models?.CardModel || model('CardComponent', CardSchema);

export default CardModel;