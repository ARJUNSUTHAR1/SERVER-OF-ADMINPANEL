// In Attributes.js
import mongoose from "mongoose";

const { model, models, Schema } = mongoose;

const Layoutimg = new Schema({
    name: { type: String, required: true },
    Images: [
        {
            src: { type: String, required: true },
        },
    ],
    visible: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
}, {
    timestamps: true,
});

const LayoutImg = models?.LayoutImg || model('LayoutImg', Layoutimg);

export default LayoutImg;
