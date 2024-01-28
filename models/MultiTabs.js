// In Attributes.js
import mongoose from "mongoose";

const { model, models, Schema } = mongoose;

const MultiTabs = new Schema({
    name: { type: String, required: true },
    Tabs: [
        {
            tabname: { type: String, required: true },
            component: {
                type: Schema.Types.ObjectId,
                ref: "SliderComp",
            },
            active: {
                type: Boolean,
                default: false,
            },
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

const MultiTab = models?.MultiTabs || model('MultiTabs', MultiTabs);

export default MultiTab;
