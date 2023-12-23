import mongoose, { model, models, Schema } from "mongoose";

const Attributes = new Schema({
    name: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
}, {
    timestamps: true,
});

export const Attribute = models?.Attribute || model('Attribute', Attributes);