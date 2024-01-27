import express from "express";
import BannerModel from "../models/BannerModel.js";


const router = express.Router();
// create tag
router.post(
    "/create-banner", async (req, res, next) => {
        try {
            const { bannerImageLink, isVisible, overlayImages } = req.body;

            // Validate the request data (add more validation if necessary)
            if (!bannerImageLink || typeof isVisible !== 'boolean' || !Array.isArray(overlayImages)) {
                return res.status(400).json({success: false, message: "Invalid request data" });
            }

            // Create a new banner using the Mongoose model
            const newBanner = new BannerModel({
                bannerImageLink,
                isVisible,
                overlayImages,
            });

            // Save the banner to the database
            await newBanner.save();

            // Respond with success message
            res.status(201).json({success: true, message: 'Banner created successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    })

export default router;