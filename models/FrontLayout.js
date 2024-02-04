import mongoose from "mongoose";

const { model, models, Schema } = mongoose;

const FrontLayout = new Schema({
    Layout: [
        {
            column: {
                type: String,
            },
            name: {
                type: String,
            },
            sortIndex: {
                type: Number,
            },
            id: { type: Schema.Types.ObjectId, required: true }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now(),
    },
}, {
    timestamps: true,
});

const FrontLayouts = models?.FrontLayout || model('FrontLayout', FrontLayout);
export default FrontLayouts;