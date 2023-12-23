// In Attributes.js
import mongoose from "mongoose";

const { model, models, Schema } = mongoose;

const Attributes = new Schema({
    name: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
}, {
    timestamps: true,
});

const Attribute = models?.Attribute || model('Attribute', Attributes);

export default Attribute; // Change this line to use default export
