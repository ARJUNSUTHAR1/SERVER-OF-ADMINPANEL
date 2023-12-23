const express = require("express");
const router = express.Router();
const Attribute = require("../models/Attributes");
const User = require('../models/Usermodel.js')


// create attribute
router.post(
    "/create-attribute", async (req, res, next) => {
        try {
            const shopId = req.body.shopId;
            const shop = await User.findById(shopId);

            if (!shop) {
                return res.status(404).json({
                    success: false,
                    error: "Shop Admin Id is invalid!"
                })
            }
            else {
                // All the variables for attributes now we can customize
                const { name } = req.body;

                // create attribute
                const attributeDoc = await Attribute.create(
                    {
                        name
                    }
                )

                res.status(201).json({
                    success: true,
                    attributeDoc,
                });
            }
        } catch (error) {
            return res.status(404).json({
                success: false,
                error: error.message
            });
        }
    })

// get all attributes of a shop
router.get(
    "/get-all-attributes/:id",
    catchAsyncErrors(async (req, res, next) => {
        try {
            const attributes = await Attribute.find({ shopId: req.params.id });
            res.status(201).json({
                success: true,
                attributes,
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                error: error.message
            });
        }
    })
);

// delete attribute of a shop
router.delete(
    "/delete-attribute/:id",
    catchAsyncErrors(async (req, res, next) => {
        try {
            const attribute = await Attribute.findById(req.params.id);

            if (!attribute) {
                return (res.status(400).json({
                    success: false,
                    error: "attribute is not found with this id"
                }))
            }

            await attribute.remove();

            res.status(201).json({
                success: true,
                message: "attribute Deleted successfully!",
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                error: error.message
            });
        }
    })
);



// update for a attribute
router.post(
    "/update-attribute", async (req, res, next) => {
        try {

            const attributeId = req.body.attributeId;

            const attribute = await Attribute.findById(attributeId);

            if (!attribute) {
                return res.status(400).json({
                    success: false,
                    error: "attribute Id is invalid!"
                });
            }
            else {
                // All the variables for attributes now we can customize
                const { name } = req.body;


                // upadte attribute
                const upadateattributeDoc = await Attribute.findByIdAndUpdate(
                    attributeId,
                    {
                        name
                    }
                );

                res.status(201).json({
                    success: true,
                    upadateattributeDoc,
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