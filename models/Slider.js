// In Attributes.js
import mongoose from "mongoose";

const { model, models, Schema } = mongoose;

const SliderCom = new Schema({
    heading: { type: String, required: true },
    Images: [
        {
            title: { type: String, required: true },
            src: { type: String, required: true },
        },
    ],
    visible: {
        type: Boolean,
        default: false,
    },
    viewall: {
        type: String,
        default: "/",
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
}, {
    timestamps: true,
});

const SliderComp = models?.SliderComp || model('SliderComp', SliderCom);

export default SliderComp;
