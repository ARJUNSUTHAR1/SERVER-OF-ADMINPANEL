import Product from "../models/product.js";
import express from 'express';
import User from "../models/Usermodel.js";
import upload from "../middlewares/multer.js";
import cloudinary from "../configs/cloudinaryConfig.js";


const router = express.Router();

// create product
router.post(
    "/create-product", async (req, res, next) => {
        try {
            const newProduct = await Product.create(req.body);

            res.status(200).send({
                success: true,
                message: "Product has been added successfully",
            })

        } catch (error) {
            return res.status(404).json({
                success: false,
                error: error.message,   
            });
        }
    })

// get all products of a shop
router.get(
    "/get-all-products-shop/:id",
    async (req, res, next) => {
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

// delete product of a shop
router.delete(
    "/delete-shop-product/:id",
    async (req, res, next) => {
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

export default router;