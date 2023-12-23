const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const User = require('../models/Usermodel.js')


// create category
router.post(
    "/create-category", async (req, res, next) => {
        try {
            const shopId = req.body.shopId;
            const shop = await User.findById(shopId);

            if (!shop) {
                return next(new ErrorHandler("Shop Admin Id is invalid!", 400));
            }
            else {
                // All the variables for categorys now we can customize
                const { name } = req.body;


                // create category
                const categoryDoc = await Category.create(
                    {
                        name
                    }
                )

                res.status(201).json({
                    success: true,
                    categoryDoc,
                });
            }
        } catch (error) {
            return res.status(404).json({
                success: false,
                error: error.message
            });
        }
    })

// get all categorys of a shop
router.get(
    "/get-all-categorys/:id",
    catchAsyncErrors(async (req, res, next) => {
        try {
            const categorys = await Category.find({ shopId: req.params.id });
            res.status(201).json({
                success: true,
                categorys,
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                error: error.message
            });
        }
    })
);

// delete category of a shop
router.delete(
    "/delete-shop-category/:id",
    catchAsyncErrors(async (req, res, next) => {
        try {
            const category = await Category.findById(req.params.id);

            if (!category) {
                return next(new ErrorHandler("category is not found with this id", 404));
            }

            for (let i = 0; 1 < category.images.length; i++) {
                const result = await cloudinary.v2.uploader.destroy(
                    category.images[i].public_id
                );
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
);



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
                const { name, description, originalPrice, discountPrice, stock, images, attributes, shopId, sold_out, category, tags, properties } = req.body;


                // upadte category
                const upadatecategoryDoc = await Category.findByIdAndUpdate(
                    categoryId,
                    {
                        name, description, originalPrice, discountPrice, stock,
                        images, attributes, shopId, sold_out, category, tags, properties
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


module.exports = router;