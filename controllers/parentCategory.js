import express from "express";
import ParentCategory from "../models/ParentCategory.js";


const router = express.Router();
// create parentCategory
router.post(
    "/create-parentCategory", async (req, res, next) => {
        try {
            // All the variables for parentCategorys now we can customize
            // create parentCategory
            const { name } = req.body;

            if(!name){
                throw new Error("You haven't provided any value");
            }

            const parentCategoryDoc = await ParentCategory.create({
                name
            })

            res.status(201).json({
                message: "Create Successfully",
                success: true,
                parentCategoryDoc,
            });
        } catch (error) {
            return res.status(404).json({
                success: false,
                error: error.message
            });
        }
    })

// get all parentCategorys of a shop
router.get(
    "/get-all-parentCategory",
    async (req, res, next) => {
        try {
            const parentCategory = await ParentCategory.find({});
            res.status(201).json({
                success: true,
                parentCategory
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                error: error.message
            });
        }
    })

// delete parentCategory of a shop
router.delete("/delete-parentCategory/:id", async (req, res, next) => {
    try {
        const parentCategoryId = req.params.id;

        const parentCategory = await ParentCategory.findByIdAndDelete(parentCategoryId);

        if (!parentCategory) {
            return res.status(400).json({
                success: false,
                error: "parentCategory is not found with this id",
            });
        }

        res.status(201).json({
            success: true,
            message: "parentCategory deleted successfully!",
            parentCategory,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message,
        });
    }
});

// Update parentCategory of a shop
router.put(
    "/update-parentCategory/:id",
    async (req, res, next) => {
        try {
            const parentCategoryId = req.params.id;

            const { name } = req.body;

            const parentCategory = await ParentCategory.findById(parentCategoryId);

            if (!parentCategory) {
                return res.status(400).json({
                    success: false,
                    error: "parentCategory is not found with this id",
                });
            }

            // Update parentCategory
            parentCategory.name = name;
            await parentCategory.save();

            res.status(200).json({
                success: true,
                message: "parentCategory updated successfully!",
                parentCategory,
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