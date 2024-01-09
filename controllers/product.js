import Product from "../models/product.js";
import express from 'express';
import upload from "../middlewares/multer.js";
import cloudinary from "../configs/cloudinaryConfig.js";



const router = express.Router();
// create product
router.post(
    "/create-product", async (req, res, next) => {
        try {
            const newProduct = await Product.create(req.body);
            console.log(newProduct,"back")
            res.status(200).send({
                success: true,
                message: "Product has been added successfully",
                newProduct
            });

        } catch (error) {
            return res.status(404).json({
                success: false,
                error: error.message,
                
            });
        }
    })


// get all products of a shop
router.get(
    "/get-all-products",
    async (req, res, next) => {
        try {
            const products = await Product.find().sort({ createdAt: -1 });
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

// get all products of a shop
router.get(
    "/get-product-by-id/:id",
    async (req, res, next) => {
        try {
            const unitProducts = await Product.findById(req.params.id);
            res.status(201).json({
                success: true,
                data: unitProducts,
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                error: error.message
            });
        }
    })

// delete product of a shop
router.delete(
    "/delete-product/:id",
    async (req, res, next) => {
        try {

            const product = await Product.findByIdAndDelete(req.params.id);

            res.status(201).json({
                success: true,
                message: product.productName + " product deleted successfully!",
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                error: error.message
            });
        }
    })


router.post('/upload', upload.single('product_images'), function (req, res) {
    cloudinary.uploader.upload(req.file.path, {
        folder: "cms-images",
    }, function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: "Error"
            })
        }

        res.status(200).json({
            success: true,
            message: "Your Image Uploaded Successfully!",
            url: result.secure_url
        })
    })
});



// update for a product
router.put(
    "/update-product/:id", async (req, res, next) => {
        try {
            const productId = req.params.id;
            const product = await Product.findById(productId);

            if (!product) {
                return res.status(400).json({
                    success: false,
                    error: "Product Id is invalid!"
                });
            } else {
                // Update the product
                const updateProductDoc = await Product.findByIdAndUpdate(productId, req.body);

                res.status(201).json({
                    success: true,
                    message: `${product.productName} has been edited successfully`
                });
            }
        } catch (error) {
            return res.status(404).json({
                success: false,
                error: error.message
            });
        }
    });


export default router;