import express from "express";
import MultiTab from "../models/MultiTabs.js";


const router = express.Router();
// create multitabs
router.post(
    "/create-multitabs", async (req, res, next) => {
        try {
            // All the variables for multitabss now we can customize
            const multitabsDoc = await MultiTab.create(req.body)

            console.log(req.body, "Body")

            res.status(201).json({
                message: "Create Successfully",
                success: true,
                multitabsDoc,
            });
        } catch (error) {
            return res.status(404).json({
                success: false,
                error: error.message
            });
        }
    })

// get all multitabss of a shop
router.get(
    "/get-all-multitabs",
    async (req, res, next) => {
        try {
            const multitabs = await MultiTab.find({});
            res.status(201).json({
                success: true,
                multitabs
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                error: error.message
            });
        }
    })

// delete multitabs of a shop
router.delete("/delete-multitabs/:id", async (req, res, next) => {
    try {
        const multitabsId = req.params.id;

        const multitabs = await MultiTab.findByIdAndDelete(multitabsId);

        if (!multitabs) {
            return res.status(400).json({
                success: false,
                error: "multitabs is not found with this id",
            });
        }

        res.status(201).json({
            success: true,
            message: "multitabs deleted successfully!",
            multitabs,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message,
        });
    }
});

// Update multitabs of a shop
router.put(
    "/update-multitabs/:id",
    async (req, res, next) => {
        try {
            const multitabsId = req.params.id;

            console.log(req.body,"body")
            const multitabs = await MultiTab.findByIdAndUpdate(multitabsId, req.body);

            res.status(200).json({
                success: true,
                message: "multitabs updated successfully!",
                multitabs,
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