import express from "express";
import Category from "../models/Category.js"
import User from "../models/Usermodel.js";


const router = express.Router();
// create category
router.post(
    "/create-category", async (req, res, next) => {
        try {
            // All the variables for categorys now we can customize
            // create category
            const { name } = req.body;

            const categoryDoc = await Category.create({
                name
            })

            res.status(201).json({
                message:"Create Successfully",
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
router.delete(
    "/delete-category/:id",
    async (req, res, next) => {
        try {
            const category = await Category.findById(req.params.id);

            if (!category) {
                return (res.status(400).json({
                    success: false,
                    error: "category is not found with this id"
                }))
            }

            await category.remove();

            res.status(201).json({
                success: true,
                message: "category Deleted successfully!",
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                error: error.message
            });
        }
    })



// update for a category
router.post(
    "/update-category", async (req, res, next) => {
        try {

            const categoryId = req.body.categoryId;

            const category = await Category.findById(categoryId);

            if (!category) {
                return res.status(400).json({
                    success: false,
                    error: "category Id is invalid!"
                });
            }
            else {
                // All the variables for categorys now we can customize
                const { name } = req.body;


                // upadte category
                const upadatecategoryDoc = await Category.findByIdAndUpdate(
                    categoryId,
                    {
                        name
                    }
                );

                res.status(201).json({
                    success: true,
                    upadatecategoryDoc,
                });
            }
        } catch (error) {
            return res.status(404).json({
                success: false,
                error: error.message
            });
        }
    })



export default router;