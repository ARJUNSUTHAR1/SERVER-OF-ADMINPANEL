const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const User = require('../models/Usermodel.js')



// create product
router.post(
    "/create-product", async (req, res, next) => {
        try {
            const shopId = req.body.shopId;
            const shop = await User.findById(shopId);

            if (!shop) {

                return next(new ErrorHandler("Shop Admin Id is invalid!", 400));
            }
            else {
                // All the variables for products now we can customize
                const { name, description, originalPrice, discountPrice, stock, images, attributes, shopId, sold_out, category, tags, properties } = req.body;


                // create Product
                const productDoc = await Product.create(
                    {
                        name, description, originalPrice, discountPrice, stock,
                        images, attributes, shopId, sold_out, category, tags, properties
                    }
                )

                res.status(201).json({
                    success: true,
                    productDoc,
                });
            }
        } catch (error) {
            return res.status(404).json({
                success: false,
                error: error.message
            });
        }
    })

// get all products of a shop
router.get(
    "/get-all-products-shop/:id",
    catchAsyncErrors(async (req, res, next) => {
        try {
            const products = await Product.find({ shopId: req.params.id });
            res.status(201).json({
                success: true,
                products,
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                error: error.message
            });
        }
    })
);

// delete product of a shop
router.delete(
    "/delete-shop-product/:id",
    catchAsyncErrors(async (req, res, next) => {
        try {
            const product = await Product.findById(req.params.id);

            if (!product) {
                return next(new ErrorHandler("Product is not found with this id", 404));
            }

            for (let i = 0; 1 < product.images.length; i++) {
                const result = await cloudinary.v2.uploader.destroy(
                    product.images[i].public_id
                );
            }

            await product.remove();

            res.status(201).json({
                success: true,
                message: "Product Deleted successfully!",
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                error: error.message
            });
        }
    })
);



// update for a product
router.post(
    "/update-product", async (req, res, next) => {
        try {

            const productId = req.body.productId;
            
            const product = await Product.findById(productId);

            if (!product) {
                return res.status(400).json({
                    success: false,
                    error: "Product Id is invalid!"
                });
            }
            else {
                // All the variables for products now we can customize
                const { name, description, originalPrice, discountPrice, stock, images, attributes, shopId, sold_out, category, tags, properties } = req.body;


                // upadte Product
                const upadateProductDoc = await Product.findByIdAndUpdate(
                    productId,
                    {
                        name, description, originalPrice, discountPrice, stock,
                        images, attributes, shopId, sold_out, category, tags, properties
                    }
                );

                res.status(201).json({
                    success: true,
                    upadateProductDoc,
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