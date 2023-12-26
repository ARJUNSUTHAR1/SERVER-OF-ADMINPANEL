import express from "express";
import Attribute from "../models/Attributes.js";

const router = express.Router();

// Create attribute
router.post("/create-attribute", async (req, res, next) => {
    try {
        const { name, values } = req.body;

        // Convert the array of values to an array of objects with the 'value' field
        const options = values.map(value => ({ value }));

        const attributeDoc = await Attribute.create({
            name,
            options,
        });

        res.status(201).json({
            message: "Create Successfully",
            success: true,
            attributeDoc,
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            error: error.message,
        });
    }
});


// Get all attributes
router.get("/get-all-attribute", async (req, res, next) => {
    try {
        const attributes = await Attribute.find({}).populate("options");

        res.status(200).json({
            success: true,
            attributes,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message,
        });
    }
});

// Delete attribute
router.delete("/delete-attribute/:id", async (req, res, next) => {
    try {
        const attributeId = req.params.id;

        const attribute = await Attribute.findByIdAndDelete(attributeId);

        if (!attribute) {
            return res.status(404).json({
                success: false,
                error: "Attribute not found with this id",
            });
        }

        res.status(200).json({
            success: true,
            message: "Attribute deleted successfully!",
            attribute,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message,
        });
    }
});

// Update attribute
router.put("/update-attribute/:id", async (req, res, next) => {
    try {
        const attributeId = req.params.id;
        const { name, values } = req.body;

        // Convert the array of values to an array of objects with the 'value' field
        const options = values.map(value => ({ value }));

        const attribute = await Attribute.findById(attributeId);

        if (!attribute) {
            return res.status(404).json({
                success: false,
                error: "Attribute not found with this id",
            });
        }

        console.log(options)

        // Update attribute
        attribute.name = name;
        attribute.options = options;
        await attribute.save();

        res.status(200).json({
            success: true,
            message: "Attribute updated successfully!",
            attribute,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message,
        });
    }
});

export default router;
