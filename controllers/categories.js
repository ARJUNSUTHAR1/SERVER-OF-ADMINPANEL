import express from "express";
import Category from "../models/Category.js"
import User from "../models/userModel.js";
import mongoose from "mongoose";


const router = express.Router();
// create category
router.post(
    "/create-category", async (req, res, next) => {
        try {
            const { name } = req.body;

            // Check if a category with the same name already exists
            const existingCategory = await Category.findOne({ name });

            if (existingCategory) {
                return res.status(400).json({
                    success: false,
                    message: "Category with this name already exists.",
                });
            }

            // If the name is unique, create the new category
            const categoryDoc = await Category.create(req.body);

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
router.post(
    "/check-category-name", async (req, res, next) => {
        try {
            const { name } = req.query.name;

            // Check if a category with the same name already exists
            const existingCategory = await Category.findOne({ name });

            if (existingCategory) {
                return res.status(400).json({
                    success: false,
                    message: "Category with this name already exists.",
                });
            }


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


// get all categories of a shop
router.get(
    "/get-front-category",
    async (req, res, next) => {
        try {
            const categories = await Category.find({}).sort({ createdAt: -1 });

            const populateParentCategories = async (category) => {
                if (category.parentCategory) {
                    const parentCategory = await Category.findById(category.parentCategory);
                    await populateParentCategories(parentCategory);
                    category.parentCategory = parentCategory;
                }
            };

            // Populate parent categories recursively for each category
            for (const category of categories) {
                await populateParentCategories(category);
            }

            res.status(201).json({
                success: true,
                categories
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                error: error.message
            });
        }
    }
);



// get all categorys of a shop
router.get(
    "/get-all-category",
    async (req, res, next) => {
        try {
            const category = await Category.find({}).populate({
                path: 'parentCategory', populate: {
                    path: "parentCategory",
                    model: "TotalCategory"
                }
            }).sort({ createdAt: -1 });
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

            console.log("------------------", req.body);


            const category = await Category.findByIdAndUpdate(categoryId, req.body, { new: true });

            if (!category) {
                return res.status(404).json({
                    success: false,
                    error: "Category not found",
                });
            }

            res.status(200).json({
                success: true,
                message: "Category updated successfully!",
                category,
            });
        } catch (error) {
            console.error(error)
            return res.status(500).json({
                success: false,
                error: "Internal Server Error",
            });
        }
    }
);




export default router;