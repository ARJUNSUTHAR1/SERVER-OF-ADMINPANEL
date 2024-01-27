import mongoose from "mongoose";

const { model, models, Schema } = mongoose;

const BannerSchema = new Schema({
    bannerImageLink: {
        type: String,
        required: true
    },

    isVisible: {
        type: Boolean,
        required: true,
        default: true
    },


    overlayImages: [
        {
            imageLink: {
                type: String,
                required: true
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

const BannerModel = models?.BannerModel || model('BannerComponent', BannerSchema);
export default BannerModel;