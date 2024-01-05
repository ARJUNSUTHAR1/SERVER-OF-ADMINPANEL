import express from "express";
import Category from "../models/Category.js"
import User from "../models/Usermodel.js";
import mongoose from "mongoose";


const router = express.Router();
// create category
router.post(
    "/create-category", async (req, res, next) => {
        try {
            // All the variables for categorys now we can customize


            const categoryDoc = await Category.create(req.body)

            res.status(201).json({
                message: "Create Successfully",
                success: true,
                categoryDoc,
            });
        } catch (error) {
            return res.status(404).json({
                success: false,
                error: error.message
            });
        }
    })

// get all categorys of a shop
router.get(
    "/get-all-category",
    async (req, res, next) => {
        try {
            const category = await Category.find({});
            res.status(201).json({
                success: true,
                category
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                error: error.message
            });
        }
    })

// delete category of a shop
router.delete("/delete-category/:id", async (req, res, next) => {
    try {
        const categoryId = req.params.id;

        const category = await Category.findByIdAndDelete(categoryId);

        if (!category) {
            return res.status(400).json({
                success: false,
                error: "Category is not found with this id",
            });
        }

        res.status(201).json({
            success: true,
            message: "Category deleted successfully!",
            category,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message,
        });
    }
});

// Update category of a shop
router.put(
    "/update-category/:id",
    async (req, res, next) => {
        try {
            const categoryId = req.params.id;
            
            const { name } = req.body;

            const category = await Category.findById(categoryId);

            if (!category) {
                return res.status(400).json({
                    success: false,
                    error: "Category is not found with this id",
                });
            }

            // Update category
            category.name = name;
            await category.save();

            res.status(200).json({
                success: true,
                message: "Category updated successfully!",
                category,
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