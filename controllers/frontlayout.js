import express from "express";
import FrontLayouts from "../models/FrontLayout.js";


const router = express.Router();
// create frontlayout
router.post(
    "/create-frontlayout", async (req, res, next) => {
        try {
            // All the variables for frontlayouts now we can customize

            const frontlayoutDoc = await FrontLayouts.create({
                Layout: req.body
            })

            res.status(201).json({
                message: "Create Successfully",
                success: true,
                frontlayoutDoc,
            });
        } catch (error) {
            return res.status(404).json({
                success: false,
                error: error.message
            });
        }
    })

// get all frontlayouts of a shop
router.get(
    "/get-all-frontlayout",
    async (req, res, next) => {
        try {
            const frontlayout = await FrontLayouts.find({});
            res.status(201).json({
                success: true,
                frontlayout
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                error: error.message
            });
        }
    })

// delete frontlayout of a shop
router.delete("/delete-frontlayout/:id", async (req, res, next) => {
    try {
        const frontlayoutId = req.params.id;

        const frontlayout = await FrontLayouts.findByIdAndDelete(frontlayoutId);

        if (!frontlayout) {
            return res.status(400).json({
                success: false,
                error: "frontlayout is not found with this id",
            });
        }

        res.status(201).json({
            success: true,
            message: "frontlayout deleted successfully!",
            frontlayout,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message,
        });
    }
});

// Update frontlayout of a shop
router.put(
    "/update-frontlayout/:id",
    async (req, res, next) => {
        try {
            const frontlayoutId = req.params.id;

            console.log(req.body, "body")
            const frontlayout = await FrontLayouts.findByIdAndUpdate(frontlayoutId, {
                Layout: req.body
            });

            res.status(200).json({
                success: true,
                message: "frontlayout updated successfully!",
                frontlayout,
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                error: error.message,
            });
        }
    }
);



export default router;