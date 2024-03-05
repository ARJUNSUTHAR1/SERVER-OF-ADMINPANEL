import mongoose from "mongoose";

const { model, models, Schema } = mongoose;

const BannerSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    bannerLinkCategoryOrProduct: {
        type: String,
        required: true
    },

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
            },
            linkTo: {
                type: "String",
                required: true,
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
