import express from "express";
import LayoutImg from "../models/Layoutimg.js";


const router = express.Router();
// create layoutimg
router.post(
    "/create-layoutimg", async (req, res, next) => {
        try {
            // All the variables for layoutimgs now we can customize
            const layoutimgDoc = await LayoutImg.create(req.body)

            console.log(req.body, "Body")

            res.status(201).json({
                message: "Create Successfully",
                success: true,
                layoutimgDoc,
            });
        } catch (error) {
            return res.status(404).json({
                success: false,
                error: error.message
            });
        }
    })

// get all layoutimgs of a shop
router.get(
    "/get-all-layoutimg",
    async (req, res, next) => {
        try {
            const layoutimg = await LayoutImg.find({});
            res.status(201).json({
                success: true,
                layoutimg
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                error: error.message
            });
        }
    })

// delete layoutimg of a shop
router.delete("/delete-layoutimg/:id", async (req, res, next) => {
    try {
        const layoutimgId = req.params.id;

        const layoutimg = await LayoutImg.findByIdAndDelete(layoutimgId);

        if (!layoutimg) {
            return res.status(400).json({
                success: false,
                error: "layoutimg is not found with this id",
            });
        }

        res.status(201).json({
            success: true,
            message: "layoutimg deleted successfully!",
            layoutimg,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message,
        });
    }
});

// Update layoutimg of a shop
router.put(
    "/update-layoutimg/:id",
    async (req, res, next) => {
        try {
            const layoutimgId = req.params.id;

            console.log(req.body,"body")
            const layoutimg = await LayoutImg.findByIdAndUpdate(layoutimgId, req.body);

            res.status(200).json({
                success: true,
                message: "layoutimg updated successfully!",
                layoutimg,
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