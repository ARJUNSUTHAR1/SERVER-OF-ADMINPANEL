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
                return res.status(400).json({ success: false, message: "Invalid request data" });
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
            res.status(201).json({ success: true, message: 'Banner created successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    })

router.get("/get-all-banners", async (req, res) => {
    try {
        const banners = await BannerModel.find();

        res.status(200).json({ success: true, banners });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get("/get-banner/:id", async (req, res) => {
    try {
        const banner = await BannerModel.findById(req.params.id);

        if (!banner) {
            return res.status(404).json({ success: false, message: "Banner not found" });
        }

        res.status(200).json({ success: true, banner });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update banner by ID
router.put("/update-banner/:id", async (req, res) => {
    try {
        const { bannerImageLink, isVisible, overlayImages } = req.body;

        // Validate the request data
        if (!bannerImageLink || typeof isVisible !== 'boolean' || !Array.isArray(overlayImages)) {
            return res.status(400).json({ success: false, message: "Invalid request data" });
        }

        const updatedBanner = await BannerModel.findByIdAndUpdate(
            req.params.id,
            { bannerImageLink, isVisible, overlayImages },
            { new: true }
        );

        if (!updatedBanner) {
            return res.status(404).json({ success: false, message: "Banner not found" });
        }

        res.status(200).json({ success: true, message: 'Banner updated successfully', banner: updatedBanner });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete("/delete-banner/:id", async (req, res) => {
    try {
        const deletedBanner = await BannerModel.findByIdAndDelete(req.params.id);

        if (!deletedBanner) {
            return res.status(404).json({ success: false, message: "Banner not found" });
        }

        res.status(200).json({ success: true, message: 'Banner deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;