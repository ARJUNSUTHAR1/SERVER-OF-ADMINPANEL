import express from "express";
import SliderComp from "../models/Slider.js";


const router = express.Router();
// create slidercom
router.post(
    "/create-slidercom", async (req, res, next) => {
        try {
            // All the variables for slidercoms now we can customize
            const slidercomDoc = await SliderComp.create(req.body)

            console.log(req.body, "Body")

            res.status(201).json({
                message: "Create Successfully",
                success: true,
                slidercomDoc,
            });
        } catch (error) {
            return res.status(404).json({
                success: false,
                error: error.message
            });
        }
    })

// get all slidercoms of a shop
router.get(
    "/get-all-slidercom",
    async (req, res, next) => {
        try {
            const slidercom = await SliderComp.find({});
            res.status(201).json({
                success: true,
                slidercom
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                error: error.message
            });
        }
    })

// delete slidercom of a shop
router.delete("/delete-slidercom/:id", async (req, res, next) => {
    try {
        const slidercomId = req.params.id;

        const slidercom = await SliderComp.findByIdAndDelete(slidercomId);

        if (!slidercom) {
            return res.status(400).json({
                success: false,
                error: "slidercom is not found with this id",
            });
        }

        res.status(201).json({
            success: true,
            message: "slidercom deleted successfully!",
            slidercom,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message,
        });
    }
});

// Update slidercom of a shop
router.put(
    "/update-slidercom/:id",
    async (req, res, next) => {
        try {
            const slidercomId = req.params.id;

            console.log(req.body,"body")
            const slidercom = await SliderComp.findByIdAndUpdate(slidercomId, req.body);

            res.status(200).json({
                success: true,
                message: "slidercom updated successfully!",
                slidercom,
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