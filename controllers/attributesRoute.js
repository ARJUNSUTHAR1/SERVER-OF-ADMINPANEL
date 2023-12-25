import express from "express";
import Attribute from "../models/Attributes.js"
import User from "../models/Usermodel.js";
import mongoose from "mongoose";


const router = express.Router();
// create attribute
router.post(
    "/create-attribute", async (req, res, next) => {
        try {
            // All the variables for attributes now we can customize
            // create attribute
            const { name } = req.body;

            const attributeDoc = await Attribute.create({
                name
            })

            res.status(201).json({
                message: "Create Successfully",
                success: true,
                attributeDoc,
            });
        } catch (error) {
            return res.status(404).json({
                success: false,
                error: error.message
            });
        }
    })

// get all attributes of a shop
router.get(
    "/get-all-attribute",
    async (req, res, next) => {
        try {
            const attribute = await Attribute.find({});
            res.status(201).json({
                success: true,
                attribute
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                error: error.message
            });
        }
    })

// delete attribute of a shop
router.delete("/delete-attribute/:id", async (req, res, next) => {
    try {
        const attributeId = req.params.id;

        const attribute = await Attribute.findByIdAndDelete(attributeId);

        if (!attribute) {
            return res.status(400).json({
                success: false,
                error: "attribute is not found with this id",
            });
        }

        res.status(201).json({
            success: true,
            message: "attribute deleted successfully!",
            attribute,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message,
        });
    }
});

// Update attribute of a shop
router.put(
    "/update-attribute/:id",
    async (req, res, next) => {
        try {
            const attributeId = req.params.id;

            const { name } = req.body;

            const attribute = await Attribute.findById(attributeId);

            if (!attribute) {
                return res.status(400).json({
                    success: false,
                    error: "attribute is not found with this id",
                });
            }

            // Update attribute
            attribute.name = name;
            await attribute.save();

            res.status(200).json({
                success: true,
                message: "attribute updated successfully!",
                attribute,
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