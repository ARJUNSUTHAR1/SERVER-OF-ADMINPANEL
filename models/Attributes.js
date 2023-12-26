// In Attributes.js
import mongoose from "mongoose";

const { model, models, Schema } = mongoose;

const AttributeOptionSchema = new Schema({
    value: { type: String, required: true },
});

const Attributes = new Schema({
    name: { type: String, required: true },
    options: [AttributeOptionSchema], // Array of options
    createdAt: {
        type: Date,
        default: Date.now(),
    },
}, {
    timestamps: true,
});

const Attribute = models?.Attribute || model('Attribute', Attributes);

export default Attribute; // Change this line to use default export
