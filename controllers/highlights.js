import express from "express";
import Highlight from "../models/Highlight.js";


const router = express.Router();
// create highlight
router.post(
    "/create-highlight", async (req, res, next) => {
        try {
            // All the variables for highlights now we can customize
            // create highlight
            const { name } = req.body;

            const highlightDoc = await Highlight.create({
                name
            })

            res.status(201).json({
                message: "Create Successfully",
                success: true,
                highlightDoc,
            });
        } catch (error) {
            return res.status(404).json({
                success: false,
                error: error.message
            });
        }
    })

// get all highlights of a shop
router.get(
    "/get-all-highlight",
    async (req, res, next) => {
        try {
            const highlight = await Highlight.find({});
            res.status(201).json({
                success: true,
                highlight
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                error: error.message
            });
        }
    })

// delete highlight of a shop
router.delete("/delete-highlight/:id", async (req, res, next) => {
    try {
        const highlightId = req.params.id;

        const highlight = await Highlight.findByIdAndDelete(highlightId);

        if (!highlight) {
            return res.status(400).json({
                success: false,
                error: "highlight is not found with this id",
            });
        }

        res.status(201).json({
            success: true,
            message: "highlight deleted successfully!",
            highlight,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message,
        });
    }
});

// Update highlight of a shop
router.put(
    "/update-highlight/:id",
    async (req, res, next) => {
        try {
            const highlightId = req.params.id;
            
            const { name } = req.body;

            const highlight = await Highlight.findById(highlightId);

            if (!highlight) {
                return res.status(400).json({
                    success: false,
                    error: "highlight is not found with this id",
                });
            }

            // Update highlight
            highlight.name = name;
            await highlight.save();

            res.status(200).json({
                success: true,
                message: "highlight updated successfully!",
                highlight,
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